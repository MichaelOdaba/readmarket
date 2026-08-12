# Security & Responsible Disclosure

If you discover a security vulnerability in ReadMarket, please report it privately to the project maintainers so we can fix it before it becomes public.

- Email: contact@readmarket.example
- Or open a private security issue on GitHub (do not post secrets in the public issue).

Please include:

- A short description of the issue
- Steps to reproduce (minimal repro is ideal)
- Any PoC code or screenshots (if applicable)

Do not include real credentials, API keys, or private data in issue bodies. If you need to share sensitive data to reproduce a bug, share it only via encrypted email or a secure channel after contacting the security contact above.

Recommended practices for maintainers and contributors:

- Keep `.env` files out of the repository. Only commit `.env.example` with placeholders.
- Use a secrets manager for production credentials and rotate keys regularly.
- Limit access to production systems and log security-relevant events.

Thank you for helping keep ReadMarket secure.
