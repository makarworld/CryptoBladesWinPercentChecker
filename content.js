// content.js

// Основа взята с сайта: https://wax-dapps.site/crypto-blades/combat
// Создатель: https://vk.com/abuz.trade 
// Группа создателя: https://vk.com/lowbank.trade 

console.log("[abuztrade] Script started! Wait loading page...")

window.onload = setTimeout(() => {
    const earthTrait = 0;
    const ligthingTrait = 1;
    const waterTrait = 2;
    const fireTrait = 3;
    const powerTrait = 4;
    clear1 = null
    clear2 = null
    clear3 = null
    clear4 = null


    var butElement = document.createElement('button')
    butElement.className = "abuztrade-fight"
    butElement.innerHTML = '<div class="name-list" data-v-69ae70f6="">Show win %</div>'
    butElement.style = "font-size: 1.5em;"
    while (document.querySelector('ul[class="character-list"]') == null) {}
    document.querySelector('ul[class="character-list"]').append(butElement)
    console.log('append')

    var errElement = document.createElement('div')
    errElement.className = 'abuztrade-error'
    errElement.innerHTML = '<span class="name-list" data-v-69ae70f6=""></span>'
    errElement.style = "color: #40E0D0; font-family: serif;"
    while (document.querySelector('img[class="info-divider"]') == null) {}
    document.querySelector('img[class="info-divider"]').after(errElement)
    console.log('after')

    var inpElement = document.createElement('abuztrade')
    inpElement.innerHTML = '<div style="font-weight: 400;font-size: 1.25em;height: 2px;padding: 9px 2px;border-radius: 5px;" class="name-list" data-v-69ae70f6=""><span>Bonus power: </span><input id="abuztrade-bonus-power" type="number"></input></div>'
    while (document.querySelector('ul[class="character-list"]') == null) {}
    document.querySelector('ul[class="character-list"]').append(inpElement)

    document.querySelector('button[class="abuztrade-fight"]').addEventListener("click", function () {
        console.log('click')
        if (document.URL != "https://app.cryptoblades.io/#/combat") { 
            printError('Open https://app.cryptoblades.io/#/combat for use script')
            return
        }
        try {
            // get trait hero in string, convert to int
            let heroTraitStr = document.querySelectorAll('span[data-v-69ae70f6]')[1].className.replace('-icon trait-icon', '')
            var heroTrait = checkElement(heroTraitStr)

            // get weapon div, get all stats
            let weapon = document.querySelector('div[class="weapon-icon weapon-icon has-tooltip"]')
            let stats = weapon.querySelector('div[class="stats"]').querySelectorAll('span')

            // trait of weapon
            let weaponTrait = checkElement(weapon.querySelector('span').className.replace('-icon', ''))
            // stats
            if (stats.length == 2) {
                var stat1Trait = checkElement(stats[0].className.replace('mr-1 ', '').replace('-icon', '').replace('icon ', ''))
                var stat2Trait = 0
                var stat3Trait = 0
                var stat1 = stats[1].innerText.replace(/\D+/, '')
                var stat2 = 0
                var stat3 = 0
            } else if (stats.length == 4) {
                var stat1Trait = checkElement(stats[0].className.replace('mr-1 ', '').replace('-icon', '').replace('icon ', ''))
                var stat2Trait = checkElement(stats[2].className.replace('mr-1 ', '').replace('-icon', '').replace('icon ', ''))
                var stat3Trait = 0
                var stat1 = stats[1].innerText.replace(/\D+/, '')
                var stat2 = stats[3].innerText.replace(/\D+/, '')
                var stat3 = 0
            } else if (stats.length == 6) {
                var stat1Trait = checkElement(stats[0].className.replace('mr-1 ', '').replace('-icon', '').replace('icon ', ''))
                var stat2Trait = checkElement(stats[2].className.replace('mr-1 ', '').replace('-icon', '').replace('icon ', ''))
                var stat3Trait = checkElement(stats[4].className.replace('mr-1 ', '').replace('-icon', '').replace('icon ', ''))
                var stat1 = stats[1].innerText.replace(/\D+/, '')
                var stat2 = stats[3].innerText.replace(/\D+/, '')
                var stat3 = stats[5].innerText.replace(/\D+/, '')
            }
            // enemies list
            var enemies = document.querySelectorAll('div[class="encounter-container"]');
            
            // penemy trait
            let enemy1Trait = checkElement(enemies[0].querySelector('span').className.replace('-icon', ''));
            let enemy2Trait = checkElement(enemies[1].querySelector('span').className.replace('-icon', ''));
            let enemy3Trait = checkElement(enemies[2].querySelector('span').className.replace('-icon', ''));
            let enemy4Trait = checkElement(enemies[3].querySelector('span').className.replace('-icon', ''));

            // hero power
            let heroPower = validateInput(document.querySelectorAll('span[data-v-69ae70f6]')[4].innerText.replace(/\D+/, ''));
            // bonus power
            var weaponPower = document.querySelector('input[id="abuztrade-bonus-power"]').value;
            if (weaponPower == "") { 
                weaponPower = 0;
            } else {
                weaponPower = parseFloat(weaponPower);
            }

            let enemy1 = validateInput(enemies[0].querySelector('div[class="encounter-power"]').innerText.replace(' Power', ''));
            let enemy2 = validateInput(enemies[1].querySelector('div[class="encounter-power"]').innerText.replace(' Power', ''));
            let enemy3 = validateInput(enemies[2].querySelector('div[class="encounter-power"]').innerText.replace(' Power', ''));
            let enemy4 = validateInput(enemies[3].querySelector('div[class="encounter-power"]').innerText.replace(' Power', ''));
            // print all data for debug
            console.log(heroPower, heroTrait, weaponPower, weaponTrait, stat1, stat1Trait, stat2, stat2Trait, stat3, stat3Trait, enemy1, enemy1Trait, enemy2, enemy2Trait, enemy3, enemy3Trait, enemy4, enemy4Trait)
            chances = fight(heroPower, heroTrait, weaponPower, weaponTrait, stat1, stat1Trait, stat2, stat2Trait, stat3, stat3Trait, enemy1, enemy1Trait, enemy2, enemy2Trait, enemy3, enemy3Trait, enemy4, enemy4Trait);
            enemies[0].querySelector('h1').innerText = 'Win ' + chances[0]
            enemies[1].querySelector('h1').innerText = 'Win ' + chances[1]
            enemies[2].querySelector('h1').innerText = 'Win ' + chances[2]
            enemies[3].querySelector('h1').innerText = 'Win ' + chances[3]

            if (clear1 == null) { clear1 = true; enemies[0].querySelector('button').addEventListener('click', () => {clearPercents(enemies)});}
            if (clear2 == null) { clear2 = true; enemies[1].querySelector('button').addEventListener('click', () => {clearPercents(enemies)});}
            if (clear3 == null) { clear3 = true; enemies[2].querySelector('button').addEventListener('click', () => {clearPercents(enemies)});}
            if (clear4 == null) { clear4 = true; enemies[3].querySelector('button').addEventListener('click', () => {clearPercents(enemies)});}

        } catch (err) {
            printError('Error in parsing inputs');
            console.log(err)
        }
    });

    function validateInput(input) {
        let num = input;
        if (!isNaN(parseFloat(num)) && isFinite(num)) {
            return parseFloat(num);
        } else {
            throw "Not number";
        }
    }

    function clearPercents(enemies) {
        console.log('clear');
        enemies[0].querySelector('h1').innerText = 'Fight!';
        enemies[1].querySelector('h1').innerText = 'Fight!';
        enemies[2].querySelector('h1').innerText = 'Fight!';
        enemies[3].querySelector('h1').innerText = 'Fight!';
    }

    function checkElement(elem) {
        if (elem == 'earth' || elem == 'dex') {
            return earthTrait
        } else if (elem == 'lightning' || elem == 'cha') {
            return ligthingTrait
        } else if (elem == 'water' || elem == 'int') {
            return waterTrait
        } else if (elem == 'fire' || elem == 'str') {
            return fireTrait
        } else if (elem == 'power' || elem == 'pwr') {
            return powerTrait
        }
    }

    function printError(text) {
        elem = document.querySelector('div[class="abuztrade-error"]');
        elem.innerText = 'ScriptError: ' + text;
        setTimeout(() => {elem.innerText = '';}, 5000)
    }


    function fight(heroPower, heroTrait, weaponBonusPower, weaponTrait, stat1Power, stat1Trait, stat2Power, stat2Trait, stat3Power, stat3Trait,
                    enemy1Power, enemy1Trait, enemy2Power, enemy2Trait, enemy3Power, enemy3Trait, enemy4Power, enemy4Trait) {
        
        let weaponPowerMultiplier = getWeaponPower(weaponTrait, stat1Power, stat1Trait, stat2Power, stat2Trait, stat3Power, stat3Trait);

        let power = (heroPower*weaponPowerMultiplier) + weaponBonusPower;

        let enemy1Min = Math.ceil(enemy1Power - enemy1Power*0.1);
        let enemy1Max = Math.floor(enemy1Power + enemy1Power*0.1);
        let heroEnemy1Min = Math.ceil((power - power*0.1));
        let heroEnemy1Max = Math.floor((power + power*0.1));

        let enemy2Min = Math.ceil(enemy2Power - enemy2Power*0.1);
        let enemy2Max = Math.floor(enemy2Power + enemy2Power*0.1);
        let heroEnemy2Min = Math.ceil((power - power*0.1));
        let heroEnemy2Max = Math.floor((power + power*0.1));

        let enemy3Min = Math.ceil(enemy3Power - enemy3Power*0.1);
        let enemy3Max = Math.floor(enemy3Power + enemy3Power*0.1);
        let heroEnemy3Min = Math.ceil((power - power*0.1));
        let heroEnemy3Max = Math.floor((power + power*0.1));

        let enemy4Min = Math.ceil(enemy4Power - enemy4Power*0.1);
        let enemy4Max = Math.floor(enemy4Power + enemy4Power*0.1);
        let heroEnemy4Min = Math.ceil((power - power*0.1));
        let heroEnemy4Max = Math.floor((power + power*0.1));

        let traitBonus1 = traitBonus(heroTrait, weaponTrait, enemy1Trait);
        let traitBonus2 = traitBonus(heroTrait, weaponTrait, enemy2Trait);
        let traitBonus3 = traitBonus(heroTrait, weaponTrait, enemy3Trait);
        let traitBonus4 = traitBonus(heroTrait, weaponTrait, enemy4Trait);

        let loop = 500;
        let won1 = 0;
        let won2 = 0;
        let won3 = 0;
        let won4 = 0;
        let randomHeroPower;
        let randomEnemyPower;

        for (let index = 0; index < loop; index++) {
            randomHeroPower = getRandom10(heroEnemy1Min, heroEnemy1Max) * traitBonus1;
            randomEnemyPower = getRandom10(enemy1Min, enemy1Max);
            if(randomHeroPower >= randomEnemyPower) won1++;

            randomHeroPower = getRandom10(heroEnemy2Min, heroEnemy2Max) * traitBonus2;
            randomEnemyPower = getRandom10(enemy2Min, enemy2Max);
            if(randomHeroPower >= randomEnemyPower) won2++;

            randomHeroPower = getRandom10(heroEnemy3Min, heroEnemy3Max) * traitBonus3;
            randomEnemyPower = getRandom10(enemy3Min, enemy3Max);
            if(randomHeroPower >= randomEnemyPower) won3++;

            randomHeroPower = getRandom10(heroEnemy4Min, heroEnemy4Max) * traitBonus4;
            randomEnemyPower = getRandom10(enemy4Min, enemy4Max);
            if(randomHeroPower >= randomEnemyPower) won4++;
            
        }
        chance1 = ((won1/loop)*100).toFixed(2) + ' %'
        chance2 = ((won2/loop)*100).toFixed(2) + ' %'
        chance3 = ((won3/loop)*100).toFixed(2) + ' %'
        chance4 = ((won4/loop)*100).toFixed(2) + ' %'
        console.log(chance1, chance2, chance3, chance4)
        return [chance1, chance2, chance3, chance4]
    }

    function getWeaponPower(weaponTrait, stat1, trait1, stat2, trait2, stat3, trait3) {
        let powerPerPoint = 0.0025;
        let matchingPowerPerPoint = powerPerPoint * 1.07;
        let traitlessPowerPerPoint = powerPerPoint * 1.03;
        let result = 1;

        if (stat1 > 0 && trait1 >= 0) {
            if (trait1 == weaponTrait) result = result + stat1 * matchingPowerPerPoint;
            else if (trait1 == powerTrait) result = result + stat1 * traitlessPowerPerPoint;
            else result = result + stat1 * powerPerPoint;
        }
        if (stat2 > 0 && trait2 >= 0) {
            if (trait2 == weaponTrait) result = result + stat2 * matchingPowerPerPoint;
            else if (trait2 == powerTrait) result = result + stat2 * traitlessPowerPerPoint;
            else result = result + stat2 * powerPerPoint;
        }
        if (stat3 > 0 && trait3 >= 0) {
            if (trait3 == weaponTrait) result = result + stat3 * matchingPowerPerPoint;
            else if (trait3 == powerTrait) result = result + stat3 * traitlessPowerPerPoint;
            else result = result + stat3 * powerPerPoint;
        }
        return result;
    }

    function traitBonus(characterTrait, weaponTrait, monsterTrait) {
        let bonus = 1;
        let oneBonus = 0.075;

        if (characterTrait == weaponTrait) bonus = bonus + oneBonus;
        if (isTraitEffectiveAgainst(characterTrait, monsterTrait)) bonus = bonus + oneBonus;
        if (isTraitWeakAgainst(characterTrait, monsterTrait)) bonus = bonus - oneBonus;
        return bonus;
    }

    function isTraitEffectiveAgainst(trait1, trait2) {
        if (trait1 == fireTrait && trait2 == earthTrait) return true;
        if (trait1 == waterTrait && trait2 == fireTrait) return true;
        if (trait1 == ligthingTrait && trait2 == waterTrait) return true;
        if (trait1 == earthTrait && trait2 == ligthingTrait) return true;
        return false;
    }

    function isTraitWeakAgainst(trait1, trait2) {
        if (trait1 == fireTrait && trait2 == waterTrait) return true;
        if (trait1 == waterTrait && trait2 == ligthingTrait) return true;
        if (trait1 == ligthingTrait && trait2 == earthTrait) return true;
        if (trait1 == earthTrait && trait2 == fireTrait) return true;
        return false;
    }

    function getRandom10(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}, 10000);



