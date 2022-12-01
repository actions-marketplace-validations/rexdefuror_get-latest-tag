import { getInput, exportVariable, setFailed } from '@actions/core';
import { getOctokit } from '@actions/github';

const main = async () => {
    const token = getInput('token');
    const repo = getInput('repo');
    const owner = getInput('owner');
    const prefix = getInput('prefix') || "";
    const suffix = getInput('suffix') || "";
    const regexInput = getInput('regex') || null;
    const releasesOnly = (getInput('releasesOnly') === 'true');

    const octokit = getOctokit(token);

    if (releasesOnly) {
        const releases = await octokit.rest.repos.listReleases({
            owner: owner,
            repo: repo
        });

        let foundTags = [];
        for (const release of releases.data) {
            const tagName = release.tag_name;

            if (!tagName.startsWith(prefix)) {
                continue;
            }

            if (regexInput && new RegExp(regexInput).test(tagName)) {
                continue;
            }

            if (!tagName.endsWith(suffix)) {
                continue;
            }

            foundTags.push(tagName);
        }

        if (foundTags.length == 0) {
            setFailed("No tags found");
            return;
        }

        exportVariable('LATEST_TAG', foundTags[0]);

        return;
    }

    const tags = await octokit.rest.repos.listTags({
        owner: owner,
        repo: repo
    });

    let foundTags = [];
    for (const tag of tags.data) {
        const tagName = tag.name;

        if (!tagName.startsWith(prefix)) {
            continue;
        }

        if (regexInput && new RegExp(regexInput).test(tagName)) {
            continue;
        }

        if (!tagName.endsWith(suffix)) {
            continue;
        }

        foundTags.push(tagName);
    }

    if (foundTags.length == 0) {
        setFailed("No tags found");
        return;
    }

    exportVariable('LATEST_TAG', foundTags[0]);
};

main();