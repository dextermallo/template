# this script is used to load a list of db data on mongodb by following steps:
# 1. create a list of table you wants to restore in a file on FILE_LIST_PATH,
#    it should looks like the following text:
#    
#    # ./flielist.txt
#
#    catalog, ./data/catalog.json
#       ^               ^
#   table name      data of table (json)
#
# 2. run the scripts.

GREEN='\033[0;32m'
NC='\033[0m'

echo "Enter your ${GREEN}FILE_LIST_PATH${NC}:"
read FILE_LIST_PATH

echo "Enter your ${GREEN}DB_NAME${NC}:"
read DB_NAME

list=`cat $FILE_LIST_PATH`


for item in $list; do
    table_name="$(cut -d',' -f1 <<<$item)"
    path="$(cut -d',' -f2 <<<$item)"
    mongoimport --db ExamPool --collection $table_name --file $path
    done

echo 'Done!'