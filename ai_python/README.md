# Python RAG + file and image guardrails

This package is an isolated preprocessing layer for an AI request. It bounds and validates the question, retrieves only relevant public fields, scans uploaded files and OCR text **before** they enter a prompt, sizes the request/output, and validates the answer after generation.

## File and image handling

- Allowed formats: UTF-8 TXT/Markdown/CSV/JSON, PDF, DOCX/XLSX/PPTX, PNG/JPEG/WEBP/TIFF/BMP.
- File extension is checked against the content signature. File size, total upload size, PDF pages, image pixels, Office ZIP entry count, expanded bytes and compression ratio are bounded.
- PDFs are text-extracted and every page is rendered and OCR-scanned. Images are OCR-scanned in multiple contrast polarities. Office XML is parsed with `defusedxml`; embedded raster images go through OCR, SVG text is extracted, and external relationships/unsupported embedded objects fail closed.
- Prompt-like instructions in extracted text or OCR quarantine/block the whole request. The original image or document bytes are never returned in the prepared prompt. Extracted text is normalized and explicitly marked as untrusted data.
- Unsupported, encrypted, malformed, oversized or unscannable files fail closed. This is a defense-in-depth heuristic, **not a guarantee** that all adversarial text or steganographic content is detected. Keep tools disabled for this request path, use least-privilege server credentials, and require human review for consequential decisions.

## Install OCR dependencies

```sh
python -m pip install -r ai_python/requirements.txt
```

Install the Tesseract OCR executable and the `vie` and `eng` language packs on the host as well. Python packages alone do not include the OCR engine. If OCR is unavailable, image-bearing input fails closed. Avoid deploying this scanner as a public unauthenticated file-processing endpoint.

## JSON worker

Run `python ai_python/rag_guardrails.py` and send one JSON object on stdin. The worker accepts base64 bytes so the same scanner can sit between an authorized upload handler and the model call.

```json
{
  "question": "Tóm tắt hồ sơ này",
  "documents": [{"id":"startup-1","name":"Tái Sinh Nông","industry":"Climate Tech","summary":"Kết nối hợp tác xã với đơn vị tái chế phụ phẩm."}],
  "uploads": [{"filename":"profile.pdf","content_base64":"JVBERi0x..."}],
  "token_budget": 600
}
```

The output phase is a separate call after the provider returns:

```json
{"phase":"output","answer":"... [startup-1]","source_ids":["startup-1"]}
```

## Token controls

The package selects a small set of sources, removes non-public profile fields, keeps query-relevant sentences, bounds the context, and assigns a smaller output cap to simple questions. Token estimates are byte-based approximations; use the configured provider's tokenizer where exact budgets matter. OCR and local scanning do not consume DeepSeek API tokens, though they add local CPU time and latency.

## Current application boundary

The live app currently stores document metadata only; its document picker does not upload file contents, and `/api/ai/chat` does not accept attachments. This package is ready at the Python boundary, but **does not yet protect Render requests** until a server upload route invokes it after access checks and before `buildChatPrompt`/the provider call. Do not claim that file scanning is active in production until that integration is done. Keep authorization and token accounting in the existing Node API.

## Patterns

- [OWASP Prompt Injection Prevention Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.md): layered controls and treating retrieved content as untrusted.
- [OWASP prompt injection testing playbook](https://github.com/OWASP/secure-agent-playbook/blob/main/plugins/ai-security-skills/plays/prompt-injection-testing.md): include file and image/OCR attack surfaces in review.
- [Microsoft LLMLingua](https://github.com/microsoft/LLMLingua): question-aware prompt compression; this package uses lower-cost deterministic selection first.
- [Guardrails AI](https://github.com/guardrails-ai/guardrails): validate model inputs and outputs.
