# this script is used to sync files between two path, when duplication is required between different projects,
# you can automatically sync commonly files between them with a backup mechanism in case of losing data.
# it contains several steps:
# 
# 1. enter file list path, for example: ./list.txt
# in list.txt, you can setup a list of file that you want to sync, for instance:
#
# .a/f.txt, ./b/f.txt
# <from path>, <to_path>
# 
# 2. input file list path and backup dir path.

GREEN='\033[0;32m'
NC='\033[0m'

echo "Enter your ${GREEN}FILE_LIST_PATH${NC}:"
read FILE_LIST_PATH

echo "Enter your ${GREEN}BACKUP_PATH${NC}:"
read BACKUP_PATH

fileIsExists() {
    if [ -f $1 ]; then
        return true
    else
        return false
    fi    
}

syncFile() {
    if fileIsExists $2; then
        backup_dir_name=$(date)
        mkdir $BACKUP_PATH/$backup_dir_name
        cp $2 $BACKUP_PATH/$backup_dir_name
        cp $1 $2
    else
        cp $from_path $to_path
    fi
}

list=`cat $FILE_LIST_PATH`

for item in $list; do
    from_path="$(cut -d',' -f1 <<<$item)"
    to_path="$(cut -d',' -f2 <<<$item)"
    syncFile $from_path $to_path
    done

echo 'Done!'


