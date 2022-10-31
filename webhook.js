//npm install express first
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const crypto = require('crypto');

const secretKey = 'SECRET KEY GOES HERE';
const token = 'PERSONAL ACCESS TOKEN GOES HERE';

const exec = require('child_process').exec;

app.use(bodyParser.json());


app.post('/', function(req, res) {
        const body = req.body;
        const signature = req.headers['x-hub-signature'];
        const data = JSON.stringify(req.body);
        const parsed = JSON.parse(data);

        let fullName = parsed.repository.full_name;

        let hmacDigest = "sha1=" + crypto.createHmac("sha1", secretKey).update(JSON.stringify(body)).digest("hex");

        if (signature == hmacDigest) {
                console.log('sigs match!');


                // curl below sets branch protection on branch 'main' for repo which triggered webhook
                exec('curl -X PUT -H "Accept: application/vnd.github+json" -H "Authorization: Bearer ' + token + '" https://api.github.com/repos/' + fullName + '/branches/main/protection -d \'{"required_status_checks":{"strict":true,"contexts":["continuous-integration/travis-ci"]},"enforce_admins":true,"required_pull_request_reviews":{"dismissal_restrictions":{"users":["octocat"],"teams":["justice-league"]},"dismiss_stale_reviews":true,"require_code_owner_reviews":true,"required_approving_review_count":2,"require_last_push_approval":true,"bypass_pull_request_allowances":{"users":["octocat"],"teams":["justice-league"]}},"restrictions":{"users":["octocat"],"teams":["justice-league"],"apps":["super-ci"]},"required_linear_history":true,"allow_force_pushes":true,"allow_deletions":true,"block_creations":true,"required_conversation_resolution":true,"lock_branch":true,"allow_fork_syncing":true}\'');

                // curl below gets branch protection settings on branch main of the repo which triggered webhook
                //var protections = execSync('curl -H "Accept: application/vnd.github+json" -H "Authorization: Bearer ' + token +'" https://api.github.com/repos/' + fullName  + '/branches/main/protection' );
                //console.log(JSON.stringify(protections));

                // curl below should create an issue then @mention and assign it to me
                exec('curl -X POST -H "Accept: application/vnd.github+json" -H "Authorization: Bearer ' + token + '" https://api.github.com/repos/' + fullName + '/issues -d \'{"title":"New Repo Created","body":"A new repository was created just now in your organization. Can you please take a look @aeferguson? The repo now has the following protections: required_status_checks:strict:true | contexts:continuous-integration/travis-ci | enforce_admins:true | required_pull_request_reviews:dismissal_restrictions:users | teams | dismiss_stale_reviews:true | require_code_owner_reviews:true | required_approving_review_count:2 | require_last_push_approval:true | bypass_pull_request_allowances:users:teams | restrictions:users:teams | required_linear_history:true | allow_force_pushes:true | allow_deletions:true | block_creations:true | required_conversation_resolution:true | lock_branch:true | allow_fork_syncing:true","assignees":["aeferguson"],"labels":["@high"]}\'');

        }

        //
        //console.log(parsed.repository.id);
        //console.log(parsed.repository.full_name);

        //
        res.send();
});


app.listen(8080, function() {
        //console.log('Server running on port 8080.');
});
