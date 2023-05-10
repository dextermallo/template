# This script is to add you on-prem's ip into azure SQL database's firewall in a easier way.
current_ip=`curl ifconfig.me`

# based on your SQL database's setup
region='region'
server='server'

# firewall naming rule
name='name'

az sql server firewall-rule update -g $region -s $server -n $name --start-ip-address $current_ip --end-ip-address $current_ip