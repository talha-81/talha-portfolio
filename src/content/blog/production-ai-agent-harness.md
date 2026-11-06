---
title: "The Agent Harness Matters More Than the Model"
slug: production-ai-agent-harness
description: "Build production AI agents with a reliable harness: least-privilege tools, sandboxing, evals, traces, and a control loop that handles failure."
date: 2026-11-06
updated: 2026-11-06
tags:
  - AI agents
  - Software engineering
  - Production systems
  - AI security
cover: /blog/covers/production-ai-agent-harness.svg
author: Talha Arshad
draft: false
meta_title: "Production AI Agent Harness: Beyond the Demo"
keywords:
  - production AI agent harness
  - AI agent permissions
  - agent tool sandboxing
  - AI agent evaluation
  - agent observability
read_time: "8 min read"
cover_image_alt: "Architecture diagram showing a replaceable language model inside a runtime with permission checks, sandboxed tools, durable state, traces, and evaluation feedback."
---

# The Agent Harness Matters More Than the Model

By Talha Arshad · November 6, 2026

A convincing agent demo proves that a model can complete a task under favorable conditions. Production demands useful work when tools fail, permissions change, and nobody watches every step.

My engineering position is that the harness matters more than the model once you cross that boundary. Permissions, tools, sandboxing, evals, and the control loop make an agent fit for production. Treat the model as an interchangeable component, with every replacement tested rather than assumed equivalent.

A production AI agent harness should make a mistaken proposal safe to reject, a failed operation safe to recover, and a successful outcome possible to verify.

## What an agent harness actually is

The harness is the runtime around the model. It coordinates planning and tool use, enforces permissions, sandboxes side effects, records traces, and connects execution to quality scoring. The model proposes what to do. The runtime decides what may execute and records what happened.

Anthropic's [guide to agent evaluations](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) defines an agent harness as the system that processes inputs, orchestrates tool calls, and returns results. It distinguishes that runtime from the evaluation harness that runs tests and grades outcomes.

Keep that distinction in implementation, but design the systems together. Your runtime needs to produce the evidence your evaluators inspect.

In [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), Anthropic describes using progress artifacts, incremental work, and explicit testing to address failures across context windows. A capable model still needed an environment that preserved work and checked completion.

## Why demos hide the harness

Picture a demo that looks up an order and drafts a response. The input is clear, the service responds, and the presenter catches anything awkward before the audience notices.

Now consider an illustrative production version. The service times out after accepting an update. A user requests an action outside their account. A retrieved document contains instructions addressed to the assistant.

The demo leaves important questions unanswered:

- Who authorizes the action?
- What happens when completion is uncertain?
- Where does progress survive a restart?
- What evidence proves the task succeeded?

I would not treat a watched, happy-path run as evidence for unattended execution. Anthropic's [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) recommends starting with simple solutions and adding complexity only when it improves outcomes. Sometimes the right production design is a fixed workflow containing a model call, not an open-ended agent.

## Permissions belong outside the prompt

Use least privilege as an execution rule. Give a support assistant access to the relevant account, not an unrestricted customer database. Separate permission to read an order from permission to change it.

Enforce identity, tenant boundaries, resource access, and action policy in trusted application code. Do not trust an account identifier merely because the model supplied it.

The [MCP security best practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices) recommend minimal initial scopes and targeted elevation when privileged operations become necessary. They also warn against treating claimed scopes as sufficient without server-side authorization logic.

For consequential writes, bind approval to the exact proposed operation. Show the reviewer the destination, affected resource, arguments, and supporting evidence. Reject execution if those details change after approval.

Treat external content as data, never as authority. [OWASP's prompt injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) describes indirect injection through websites and files. It recommends least privilege, separation of untrusted content, and human approval for high-risk operations.

For example, an email asking an invoice assistant to forward financial records must not grant permission to send them. The authorization decision belongs to the application, regardless of how persuasive the email sounds.

## Tools need contracts and recovery behavior

In my earlier post on [why AI agents break in production](https://talha-ai.netlify.app/blog/why-ai-agents-break-in-production), I covered ambiguous tool errors and duplicate actions. The harness is where those fixes become enforceable.

Prefer narrow operations such as `lookup_order` and `prepare_refund` over a tool that accepts arbitrary requests. Specify required fields, accepted values, output shape, and failure categories. Validate inputs before execution and outputs before returning them to the model.

Anthropic's [tool-design guidance](https://www.anthropic.com/engineering/building-effective-agents) recommends clear documentation, examples, explicit boundaries, and interfaces that make mistakes harder.

Distinguish an empty result from a timeout. Distinguish a permission denial from a temporary service failure. Give the control loop a defined response to each condition instead of asking the model to improvise recovery.

Assign retry ownership to a specific layer. For writes, preserve an operation identifier across retries and use downstream idempotency support where available. When a response is lost, reconcile the action's status before attempting it again.

Never translate an uncertain write into a confident success message. Report what the runtime can verify and hand off unresolved state.

## Sandbox the side effects

Permissions govern application actions. A code-execution sandbox needs separate limits on what a process can reach.

In its [sandboxing engineering write-up](https://www.anthropic.com/engineering/claude-code-sandboxing), Anthropic describes filesystem and network isolation as complementary boundaries. It also describes keeping sensitive credentials outside a hosted execution sandbox and mediating access through a proxy.

For your own implementation, define boundaries explicitly:

- Limit filesystem access to the task workspace and required inputs.
- Restrict network destinations, including internal services and metadata endpoints.
- Keep long-lived credentials outside model context and generated-code environments.
- Run code without host-level privileges and restrict subprocesses.
- Apply execution deadlines and resource limits.

An illustrative reporting agent may need to parse uploaded documents and produce a spreadsheet. That does not justify access to the host home directory or arbitrary outbound connections.

Choose isolation appropriate to your threat model and test it. Do not assume that placing a process in a container establishes every required boundary. Check mounted paths, reachable services, and exposed secrets.

Treat sandboxing as containment, not a promise that prompt injection has disappeared. Keep authorization checks and approval gates even inside the sandbox.

## Evals should check outcomes and boundaries

A polished response is not proof of completed work. Anthropic's [agent evaluation guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) distinguishes the execution transcript from the outcome in the environment. It recommends deterministic graders where possible and calibration of model-based graders against human judgment.

Build regression cases around your workflow's definition of success. For an invoice assistant, check whether the intended record exists, whether its fields match the source, and whether external delivery remained blocked without approval.

Add failure cases alongside normal tasks:

- A tool returns malformed data or loses its connection.
- A document contains an instruction to reveal private information.
- A user requests access to another tenant's records.
- Execution resumes after a partially completed write.
- The agent must stop because permission is denied.

Check final state and policy compliance separately. A completed task that violated an access boundary is a failure, not a qualified success.

Repeat cases to expose inconsistent behavior. Keep fixtures isolated so previous runs cannot leave helpful artifacts behind. Run the suite when changing prompts, tools, policy, runtime code, or the model.

This makes model interchangeability practical. You have an acceptance test for a replacement instead of relying on its reputation.

## Observe the control loop, not only the answer

Record a trace that connects the user request to model responses, proposed tool calls, authorization decisions, approvals, execution results, retries, and final state. Preserve version identifiers for the model, prompts, tools, and policy.

The [evaluation guide](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) emphasizes reading transcripts to distinguish agent mistakes from faulty grading. Apply the same habit when investigating production incidents.

Log observable decisions and artifacts. Do not make debugging depend on hidden model reasoning. Capture the available inputs, selected action, policy result, and verified outcome.

Track task completion alongside latency, cost, escalation, and rejected actions. Protect traces with redaction, access controls, and retention rules. A debugging system should not become another place where credentials or customer data leak.

## A starter architecture for production

Start with a bounded workflow chosen from a concrete business need. My post on [business processes to automate with AI agents](https://talha-ai.netlify.app/blog/10-business-processes-automate-ai-agents) can help frame that scope. Pick work whose outcome you can inspect before broadening autonomy.

A practical design separates the model adapter, durable workflow state, policy gate, and tool executor. Send execution events to a trace store and use controlled test environments for evaluation.

The request handler authenticates the user and records task scope. The control loop loads saved state, requests a proposal, validates it, and checks authorization. Approved operations execute through restricted adapters. The runtime saves the result before continuing.

Before launch, verify that:

- Restarts preserve completed work and pending approvals.
- Writes have deduplication or reconciliation behavior.
- Time, cost, and execution budgets stop the loop.
- Operators can disable a tool or pause a run.
- Partial failures produce a usable handoff.
- Regression tests cover forbidden actions as well as successful tasks.

Begin with read-only execution or shadow runs. Expand permissions when reviewed traces and evals support the change, not because the demo looked convincing.

## Frequently asked questions

### What is an AI agent harness?

It is the runtime around a model that coordinates tools, state, permissions, execution, and traces. Evaluation infrastructure tests whether that combined system behaves correctly.

### Does the model still matter?

Yes. Select a capable model for the task, then test it inside your harness. A model upgrade does not replace authorization, recovery, or isolation.

### Is MCP an agent harness?

No. The [MCP documentation](https://modelcontextprotocol.io) defines it as a standard for connecting AI applications to external systems. Your application still needs execution policy, durable state, recovery, and evaluation. I go deeper on that toolchain in [Secure MCP Toolchains](https://talha-ai.netlify.app/blog/secure-mcp-toolchains).

### What should I build before allowing autonomous writes?

Build scoped authorization, exact-action approvals, safe retry behavior, traces, and regression tests. Verify them against failure cases before granting write access.

## Build a system you can trust and change

The model deserves careful selection, but it should not carry responsibilities that belong to application code. Make permissions enforceable, side effects contained, progress recoverable, and quality measurable.

If you want help designing production agent systems, [reach me through my portfolio](https://talha-ai.netlify.app/). We can work through the workflow, its failure modes, and the harness it needs before expanding autonomy.

## Sources

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Making Claude Code safer with sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)
- [Model Context Protocol introduction](https://modelcontextprotocol.io)
- [MCP security best practices](https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices)
- [OWASP prompt injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
