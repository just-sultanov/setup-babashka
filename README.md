<a href="https://github.com/just-sultanov/setup-babashka/actions">
  <img alt="setup-babashka action status" src="https://github.com/just-sultanov/setup-babashka/workflows/test/badge.svg">
</a>

# setup-babashka

This action sets up [babashka](https://github.com/babashka/babashka) for using
in Github Actions.

## Usage

See [action.yml](action.yml)

```yaml
steps:
  # ...
  - name: Install babashka
    uses: just-sultanov/setup-babashka@v1
    with:
      version: '0.2.10'

  - name: Run babashka
    run: bb --version
```

## License

The scripts and documentation in this project are released under
the [MIT License](LICENSE).
