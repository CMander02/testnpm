// 读取data.json文件
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        // 获取下拉菜单元素
        const itemSelector1 = document.getElementById('itemSelector1');
        const itemSelector2 = document.getElementById('itemSelector2');

        // 使用数据填充下拉菜单
        data.items.forEach(item => {
            const option1 = document.createElement('option');
            option1.value = item.value; // 假设每个选项都有一个对应的数值
            option1.text = item.name;
            itemSelector1.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = item.value; // 假设每个选项都有一个对应的数值
            option2.text = item.name;
            itemSelector2.appendChild(option2);
        });

        // 添加事件监听器
        itemSelector1.addEventListener('change', calculateSum);
        itemSelector2.addEventListener('change', calculateSum);

        function calculateSum() {
            // 获取用户的选择
            const selectedItem1 = Number(itemSelector1.value);
            const selectedItem2 = Number(itemSelector2.value);

            // 计算和
            const sum = selectedItem1 + selectedItem2;

            // 显示计算结果
            const itemDetails = document.getElementById('itemDetails');
            itemDetails.textContent = selectedItem1 + '+' + selectedItem2 + '=' + sum;
        }
    });