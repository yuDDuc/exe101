# Python RAG + Guardrails

Dependency-free first slice for the startup workspace AI. It is a small reference pipeline, ready to wire into the Node API or run as a JSON-in/JSON-out worker.

## What it does

- **Before the model:** validates and bounds the question, rejects direct secret/prompt extraction requests, filters documents to public profile fields, ranks matching startups with BM25-style lexical retrieval, selects up to three relevant sources (or six for count/list requests), and trims irrelevant sentences to a context token budget.
- **After the model:** requests a smaller generation cap before the call (128 tokens for counts, 256 for ordinary chat, 512 for analysis), then rejects credential-like strings, unsafe investment promises/advice, missing/unknown source citations, and caps long replies at six sentences / 2,400 characters without a second model call.
- **Token savings:** retrieve only relevant profiles, compact metadata, remove unused/private fields, bound generated output before the call, and keep an approximate byte-based token budget. No embedding model, vector database, or external dependency is needed for the current small catalog.

## JSON worker interface

Run `python ai_python/rag_guardrails.py` and send one JSON object on stdin.

Input phase:

```json
{
  "question": "phân tích Tái Sinh Nông",
  "documents": [
    {"id":"startup-tai-sinh-nong","name":"Tái Sinh Nông","industry":"Climate Tech","stage":"Pre-seed","location":"Cần Thơ","summary":"Kết nối hợp tác xã với đơn vị tái chế phụ phẩm nông nghiệp."}
  ],
  "top_k": 3,
  "token_budget": 600
}
```

Output phase:

```json
{"phase":"output","answer":"...","source_ids":["startup-tai-sinh-nong"]}
```

Private CSV and diligence data do not belong in the RAG document list. The app API must finish its existing access checks first, then pass only the authorized financial metrics separately when a user has permission.

## GitHub patterns informing this slice

- [Microsoft LLMLingua](https://github.com/microsoft/LLMLingua): question-aware prompt compression. This module uses cheaper deterministic extraction first, avoiding a second model/tokenizer dependency.
- [Guardrails AI](https://github.com/guardrails-ai/guardrails): validate inputs and outputs instead of trusting raw model text.
- [OpenAI Guardrails for Python](https://github.com/openai/openai-guardrails-python): composable checks around model calls; here, local checks stay provider-neutral for DeepSeek.

This is not yet wired into the live Node API. The next integration step is to call this worker from `/api/ai/chat`, keep the current authorization and billing checks in Node, and pass output through the downstream guardrail before saving/delivering it.
