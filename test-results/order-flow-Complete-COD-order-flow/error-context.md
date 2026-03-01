# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - img "Login Banner" [ref=e4]
    - generic [ref=e6]:
      - heading "Login" [level=1] [ref=e7]
      - generic [ref=e8]:
        - textbox "Email *" [ref=e10]
        - generic [ref=e12]:
          - textbox "Password *" [ref=e13]
          - button "Show password" [ref=e14] [cursor=pointer]:
            - img [ref=e15]
        - button "Forgot Password" [ref=e18] [cursor=pointer]
        - button "LOGIN" [ref=e19] [cursor=pointer]
      - paragraph [ref=e20]:
        - text: Don't have an account?
        - link "Register With us" [ref=e21] [cursor=pointer]:
          - /url: /register
  - button "Open Next.js Dev Tools" [ref=e27] [cursor=pointer]:
    - img [ref=e28]
  - alert [ref=e31]
```