<img src="./app/images/favicon.ico" alt="react boilerplate banner" align="center"  width="100"/>

## Quick start
```
npm install
npm run start
```

## Deploy
The deploy consits on building everything to `/dist` and then pushing that to `gh-page` branch where Github Pages are configured. 

For this to work with low effort you will need to mount the branch as a subdirectory with:
```
git worktree add dist gh-pages
```
And to build and deploy simply do
```
npm run dist:deploy
```
