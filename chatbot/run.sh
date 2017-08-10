host="0.0.0.0"
port=8888
appName="python server.py"

nohup ./start_server.sh > ./server.log 2>&1 &

echo ">> 程序启动中，请稍等..."
sleep 10

while true;
do
count=`ps -fe | grep "$appName" | grep -v "grep" | wc -l`
nport=`echo ""|telnet $host $port 2>/dev/null|grep "\^]"|wc -l`
echo ">> 程序进程数：" $count "端口是否通：" $nport
if [ "$count" != "1" -a $nport -eq 0 ];
then
echo "!! 重新启动程序中, 请等候10秒。"
fi
sleep 10 
done
