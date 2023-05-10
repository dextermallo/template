# the script is to:
# - help your multi-folder up-to-date align to git
# - clean up redundancy such as /log, /dist, etc.

keyword="folder keyword which want to cleanup"

for folder in */ ; do
    if [[ $folder == *$keyword* ]]; then
        echo "$folder"
        cd $folder
        git checkout master
        git remote prune origin
        git pull
        
        # add your other things which required to delete here, such as:
        rm -rf log
        # rm -rf dist
        # rm -rf package-lock.json
        # rm -rf node_modules
        cd ..
    fi
done