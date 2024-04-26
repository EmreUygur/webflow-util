"use strict";
/*
 * datasources-github
 *
 * Sygnal Technology Group
 * http://sygnal.com
 *
 * Helps extract information from Github
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubRepoTagLatest = exports.getGithubRepoTags = exports.getGithubRepoTagsUrl = void 0;
var getGithubRepoTagsUrl = function (userOrg, repo) {
    return `https://api.github.com/repos/${userOrg}/${repo}/tags`;
};
exports.getGithubRepoTagsUrl = getGithubRepoTagsUrl;
var getGithubRepoTags = function (userOrg, repo) {
    const url = (0, exports.getGithubRepoTagsUrl)(userOrg, repo);
    return new Promise((resolve, reject) => {
        const url = (0, exports.getGithubRepoTagsUrl)(userOrg, repo);
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error('Error:', error));
    });
};
exports.getGithubRepoTags = getGithubRepoTags;
var getGithubRepoTagLatest = function (userOrg, repo) {
    return new Promise((resolve, reject) => {
        (0, exports.getGithubRepoTags)(userOrg, repo)
            .then((res) => {
            resolve(res[0].name);
        }, (err) => {
        });
    });
};
exports.getGithubRepoTagLatest = getGithubRepoTagLatest;
//$.get(url).done(data => {
//    const versions = data.sort((v1, v2) => semver.compare(v2.name, v1.name));
//    $('#result').html(versions[0].name);
//});
//# sourceMappingURL=github-data.js.map