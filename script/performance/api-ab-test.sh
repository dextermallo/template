# the script is to compare a API performance via apache benchmark,
# which we only focusing on the params diff
# to use, you have to:
# 1. mkdir benchmark
# 2. create /benchmark/v1.json
# 3. update v1.json (request payload)
# 4. create /enchmark/v2.json
# 5. update v2.json (request payload)

# optional params
auth='authorization: if any'

# version as a input for switching test case
version=$1

# host for api, such as https://google.com
host='host'

# path as a input to indicate the tested api path
path=$2

file_location="benchmark/${path}/$version.json"
ab -k -c 1 -n 20 -p $file_location -T application/json -H "${auth}" "${host}/${path}"