[![Build](https://github.com/rexdefuror/get-latest-tag/actions/workflows/pipeline.yml/badge.svg)](https://github.com/rexdefuror/get-latest-tag/actions/workflows/pipeline.yml/badge.svg)

## Description

This is a simple Github action gets the latest tag. It sets an environment variable `LATEST_TAG` with the latest tag.

## Example usage

```yaml
  - name: Get latest tag
    uses: rexdefuror/get-latest-tag@v1.0.1
    with:
        token: ${{ secrets.GITHUB_TOKEN }}
        owner: ${{ github.repository_owner }}
        repo: ${{ github.repository }}
        prefix: v # optional
        suffix: '' # optional
        regex: '' # optional
        releaseOnly: false # optional
```


## Inputs

### `token`

**Required** The Github token.

### `owner`

**Required** The owner of the repository.

### `repo`

**Required** The repository name.

### `prefix`

**Optional** The prefix of the tag.

### `suffix`    

**Optional** The suffix of the tag.

### `regex`

**Optional** The regex to filter the tags.

### `releaseOnly`

**Optional** If true, only release tags will be considered.


