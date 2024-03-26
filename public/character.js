document.addEventListener('DOMContentLoaded', function () {
    let character = null; // 将character变量定义在顶层，以便在calculateStats函数中访问
    fetch('data/12F_009_12fce.json')
        .then(response => response.json())
        .then(data => {
            const character = data.char_009_12fce;

            // 显示角色信息
            document.getElementById('name').textContent = `Name: ${character.name}`;
            document.getElementById('description').textContent = `Description: ${character.description}`;
            document.getElementById('itemUsage').textContent = `Item Usage: ${character.itemUsage}`;
            document.getElementById('itemDesc').textContent = `Item Description: ${character.itemDesc}`;
            document.getElementById('itemObtainApproach').textContent = `Item Obtain Approach: ${character.itemObtainApproach}`;
            document.getElementById('rarity').textContent = `Rarity: ${character.rarity}`;
            document.getElementById('profession').textContent = `Profession: ${character.profession}`;
            document.getElementById('subProfessionId').textContent = `Sub Profession ID: ${character.subProfessionId}`;
            document.getElementById('position').textContent = `Position: ${character.position}`;
            document.getElementById('maxLevel').textContent = `maxLevel: ${character.phases[0].maxLevel}`;

            initializeDropdowns(); // 初始化下拉菜单并设置事件监听器
            initializeLevelDropdown(character.phases[0].maxLevel);
            calculateAndDisplayMaxHp(1); // Default to level 1 stats
        })
        .catch(error => console.error('Error fetching data:', error));

    // 初始化等级下拉菜单
    for (let i = 1; i <= 30; i++) {
        document.getElementById('trust').options.add(new Option(i, i));
    }
    /*
    // 初始化信赖下拉菜单
    for (let i = 1; i <= 100; i++) {
        document.getElementById('trust').options.add(new Option(i, i));
    }
    // 初始化潜能下拉菜单
    for (let i = 1; i <= 6; i++) {
        document.getElementById('potential').options.add(new Option(i, i));
    }
    */

    // 添加下拉菜单的事件监听器
    document.getElementById('elite').addEventListener('change', calculateStats);
    document.getElementById('level').addEventListener('change', function () {
        const selectedLevel = parseInt(this.value);
        calculateAndDisplayMaxHp(selectedLevel);
    });
    /*
    document.getElementById('trust').addEventListener('change', calculateStats);
    document.getElementById('potential').addEventListener('change', calculateStats);
    */

    function calculateAndDisplayMaxHp(level) {
        const level1Stats = character.phases[0].attributesKeyFrames[0].data;
        const maxLevelStats = character.phases[0].attributesKeyFrames[1].data;
        const maxHp = linearInterpolate(level1Stats.maxHp, maxLevelStats.maxHp, level, character.phases[0].maxLevel);
        document.getElementById('calculatedStats').textContent = `Max HP: ${Math.round(maxHp)}`;
    }

    function linearInterpolate(y1, y2, x, maxX) {
        return y1 + (y2 - y1) * (x - 1) / (maxX - 1);
    }
});
