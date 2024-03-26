#!/bin/bash

# 源JSON文件
SOURCE_JSON="character_table.json"

# 检查jq是否安装
if ! command -v jq &> /dev/null
then
	echo "jq could not be found, please install jq to run this script."
	exit
fi

# 读取并处理每个一级分支
jq 'keys[]' -r $SOURCE_JSON | while read key;do
	# 提取一级标题的前缀（即下划线前的部分）
   	prefix=$(echo $key | cut -d'_' -f1)
	# 提取name字段和后缀（即第一个下划线后的所有内容）
	name=$(jq -r --arg KEY "$key" '.[$KEY].name' $SOURCE_JSON)
	suffix=$(echo $key | cut -d'_' -f2-)
        # 生成新的文件名
	new_filename="${name}_${suffix}.json"
	# 检查对应的文件夹是否存在，不存在则创建
	if [ ! -d "$prefix" ]; then
            mkdir "$prefix"
        fi
	# 使用jq提取该分支并保存到新的JSON文件
	jq --arg KEY "$key" '{($KEY): .[$KEY]}' $SOURCE_JSON > "$new_filename"
	# 将文件移动到对应的文件夹
	mv "$new_filename" "$prefix/"
	echo "Moved $new_filename to $prefix/"
done

