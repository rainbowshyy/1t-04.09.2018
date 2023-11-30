
//this is unorganized af, i know, you don't need tell me
// now please get out of my messy cave

var current_health = 10;
var base_max_health = 10;
var current_mana = 10;
var base_max_mana = 10;
var health_regen = 0;
var mana_regen = base_max_mana / 5000;

var level = 1;
var current_exp = 0;
var needed_exp = 10 * Math.pow(level, 2);

var current_attack_stage = 0;
var base_charge_per_click = 1;
var base_charge_per_second = 0.05;
var base_damage = 1;

var enemies_needed = 1;
var enemies_slain = 0;
var current_enemies = [];
var current_region = 0;
var current_area = 0;

var current_enemy_max_hp = 1;
var current_enemy_hp = 1;
var current_enemy_speed = 0;
var current_enemy_attack_speed = 0;
var current_enemy_damage = 0;
var current_enemy_id = 0;
var current_enemy_pos = 0;
var current_enemy_attack_stage = 0;

var skill_points = 0;

var enemy_onscreen = 1;

// region[area][room].attribute
const region = [
    [
        {
            enemy_types: [0],
            enemy_amount: [10],
        },
        {
            enemy_types: [1],
            enemy_amount: [1],
        },
        {
            enemy_types: [0,2],
            enemy_amount: [10],
        },
        {
            enemy_types: [3],
            enemy_amount: [1],
        },
        {
            enemy_types: [0,2],
            enemy_amount: [10],
        },
        {
            enemy_types: [4],
            enemy_amount: [1],
        }
    ],
];

const region_names = [
    "Infested cave"
]

// enemies[index].attribute
const enemies = [
    {
        name: "Rat",
        hp: 3,
        damage: 1,
        speed: 0.2,
        attack_speed: 0.01,
        xp: 1,
        level: 1,
    },
    {
        name: "Giant Rat",
        hp: 15,
        damage: 2,
        speed: 0.1,
        attack_speed: 0.01,
        xp: 20,
        level: 2,
    },
    {
        name: "Bat",
        hp: 3,
        damage: 1,
        speed: 0.4,
        attack_speed: 0.02,
        xp: 2,
        level: 2,
    },
    {
        name: "Giant Bat",
        hp: 20,
        damage: 2,
        speed: 0.1,
        attack_speed: 0.02,
        xp: 30,
        level: 3,
    },
    {
        name: "Temmie",
        hp: 40,
        damage: 5,
        speed: 0.06,
        attack_speed: 0.01,
        xp: 50,
        level: 5,
    }
];

function update_health_mana() {
    document.getElementById("current_health").style.width = (current_health / base_max_health * 100 + 3) + "%";
    document.getElementById("health_bar_fade").style.left = (current_health / base_max_health * 100 - 3) + "%";
    document.getElementById("health_number").innerHTML = Math.floor(current_health) + "/" + base_max_health + " HP";
    document.getElementById("current_mana").style.width = (current_mana / base_max_mana * 100 + 3) + "%";
    document.getElementById("mana_bar_fade").style.left = (current_mana / base_max_mana * 100 - 3) + "%";
    document.getElementById("mana_number").innerHTML = Math.floor(current_mana) + "/" + base_max_mana + " MP";
    if ((current_health + health_regen) < base_max_health) {
        current_health = current_health + health_regen;
    } else {
        current_health = base_max_health;
    }
    if ((current_mana + mana_regen) < base_max_mana) {
        current_mana = current_mana + mana_regen;
    } else {
        current_mana = base_max_mana;
    }
}

function change_health(amount) {
    if ((current_health + amount) <= base_max_health && (current_health + amount) >= 0) {
        current_health = current_health + amount;
        if (amount < 0) {
            document.getElementById("health_number").classList.add("shake");
            setTimeout(function () {document.getElementById("health_number").classList.remove("shake"); }, 500);
        }
    } else if ((current_health + amount) > base_max_health) {
        current_health = base_max_health;
    } else {
        current_health = 0;
        document.getElementById("health_number").classList.add("shake");
        setTimeout(function () {document.getElementById("health_number").classList.remove("shake"); }, 500);
    }
}

function change_mana(amount) {
    if ((current_mana + amount) <= base_max_mana && (current_mana + amount) >= 0) {
        current_mana = current_mana + amount;
    } else if ((current_mana + amount) < 0) {
        document.getElementById("mana_number").classList.add("shake");
        setTimeout(function () {document.getElementById("mana_number").classList.remove("shake"); }, 500);
    } else if ((current_mana + amount) > base_max_mana) {
        current_mana = base_max_mana;
    }
}

function update_level() {
    document.getElementById("current_exp").style.width = (current_exp / needed_exp * 100) + "%";
    document.getElementById("exp_number").innerHTML = current_exp + "/" + needed_exp + " exp Level: " + level;
    if (current_exp >= needed_exp) {
        level = level + 1;
        var remaining_exp = current_exp - needed_exp;
        needed_exp = 10 * Math.pow(level, 2)
        current_exp = remaining_exp;
        var old_base_max_health = base_max_health;
        var old_base_max_mana = base_max_mana;
        base_max_health = 10 + Math.floor(Math.pow(level / 1.3, 2));
        base_max_mana = 10 + Math.floor(Math.pow(level / 1.6, 2));
        current_health = (base_max_health / 100) * (current_health / old_base_max_health * 100);
        current_mana = (base_max_mana / 100) * (current_mana / old_base_max_mana * 100);
        mana_regen = base_max_mana / 5000;
        skill_points = skill_points + 1;
        update_skill_tree();
        
        notification("Level " + level + "!", " Increased max health/mana, recieved 1 skill point.", "rgb(240, 210, 50)");
        
        var i;
        for (i = 0; i < 50; i++) {
            var ix;
            for (ix = 0; ix * percent_w > player.width; ix--) {
                var color_variation = Math.random() * 55

                create_particle(Math.random() * 1.5, player.x + ix * percent_w, 85 * percent_h, ((Math.random() * percent_w) - (Math.random() * percent_w)) / 3, Math.random() * percent_h * -2, "rgb(" + (200 + color_variation) + ", " + (170 + color_variation) + ", " + (10 + color_variation) + ")", 50);
            }
        }
    }
}

function change_exp(amount) {
    current_exp = current_exp + amount;
}

var player;
var percent_w;
var percent_h;
var projectiles = [];
var projectile_particles = [];
var enemy;

function start_game() {
    game_area.start();
    player = new item(-10 * percent_w, -28 * percent_h, "blue", 20 * percent_w, 85 * percent_h, 0, 0, 0);
    load_region(0);
    nav_menu_cycle(0);
}

// width * percent_w, height * percent_h, color, x * percent_w, y* percent_h, speedx * percent_w, speedy * percent_y
// rotation = radians i think??, opacity: 0 = transparent, 1 = opaque
function item(width, height, color, x, y, spx, spy, rotation, opacity) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed_x = spx;
    this.speed_y = spy;
    this.center_x = this.x + (this.width / 2);
    this.center_y = this.y + (this.height / 2);
    this.rotation = rotation;
    this.opacity = opacity;
    this.update = function() {
        ctx = game_area.context;
        ctx.save();
        ctx.fillStyle = color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    }
    this.new_position = function() {
        this.x = this.x + this.speed_x;
        this.y = this.y + this.speed_y;
        this.center_x = this.x + (this.width / 2);
        this.center_y = this.y + (this.height / 2);
    }
}

function circle(radius, color, x, y, spx, spy, opacity) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.speed_x = spx;
    this.speed_y = spy;
    this.opacity = opacity;
    this.update = function() {
        ctx = game_area.context;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
    this.new_position = function() {
        this.x = this.x + this.speed_x;
        this.y = this.y + this.speed_y;
    }
}

var game_area = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = "100%";
        this.canvas.height = "100%";
        this.canvas.width = document.getElementById("graphics").offsetWidth;
        this.canvas.height = document.getElementById("graphics").offsetHeight;
        percent_w = document.getElementById("graphics").offsetWidth / 100;
        percent_h = document.getElementById("graphics").offsetHeight / 100;
        this.context = this.canvas.getContext("2d");
        document.getElementById("graphics").appendChild(this.canvas);
        this.interval = setInterval(game_tick, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var number_of_projectiles;
var number_of_projectile_particles;

function charge_projectile() {
    document.getElementById("attack_timer_bar_hider").style.transition = "height 0.07s";
    setTimeout(function() {document.getElementById("attack_timer_bar_hider").style.transition = "height 0s"; }, 40);
    current_attack_stage = current_charge_per_click + current_attack_stage;
}

function update_player_attack() {
    if (enemy_onscreen == 1) {
        current_attack_stage = current_attack_stage + current_charge_per_second;
    } else {
        current_attack_stage = 0;
    }
    document.getElementById("attack_timer_bar_hider").style.height = (96 - (current_attack_stage / 10 * 96)) + "%";
    document.getElementById("attack_timer_bar_fade").style.top = (96 - (current_attack_stage / 10 * 96)) + "%";
    if (current_attack_stage >= 10) {
        shoot_projectile();
        current_attack_stage = 0;
    }
}

function shoot_projectile() {
    number_of_projectiles = projectiles.push(new item(1 * percent_w, 1 * percent_h, "purple", 19 * percent_w, 62 * percent_h, 0, 0, 2));
    projectiles[number_of_projectiles - 1].projectile_speed = 0.1;
}

function load_area(area) {
    document.getElementById("enemy_info_area_text").innerHTML = "Area: " + (current_area + 1);
    current_enemies = area.enemy_types;
    enemies_needed = area.enemy_amount;
    enemies_slain = 0;
    document.getElementById("enemy_info_enemies_left").innerHTML = "Enemies left: " + (enemies_needed - enemies_slain);
    number_of_projectiles = 0;
    projectiles = [];
    spawn_enemy();
}

function load_region(region_index) {
    document.getElementById("enemy_info_region_text").innerHTML = region_names[region_index];
    current_region = region_index;
    current_area = 0;
    load_area(region[region_index][current_area]);
}

function spawn_enemy() {
    enemy_onscreen = 1;
    current_enemy_pos = 100;
    current_enemy_id = current_enemies[Math.floor(Math.random() * current_enemies.length)];
    
    current_enemy_max_hp = enemies[current_enemy_id].hp;
    current_enemy_hp = enemies[current_enemy_id].hp;
    current_enemy_damage = enemies[current_enemy_id].damage;
    current_enemy_speed = -1 * enemies[current_enemy_id].speed;
    current_enemy_attack_speed = enemies[current_enemy_id].attack_speed;
    
    document.getElementById("enemy_info_current_enemy_name").innerHTML = enemies[current_enemy_id].name;
    document.getElementById("enemy_info_current_enemy_level").innerHTML = "level " + enemies[current_enemy_id].level;
    document.getElementById("enemy_health_number").innerHTML = current_enemy_hp + "/" + current_enemy_max_hp;
    
    enemy = new item(12 * percent_w, -10 * percent_h, "red", 100 * percent_w, 85 * percent_h, current_enemy_speed * percent_w, 0, 0);
}

function update_enemy() {
    enemy.update();
    document.getElementById("current_enemy_health").style.width = (current_enemy_hp / current_enemy_max_hp * 100 + 3) + "%";
    document.getElementById("current_enemy_health_fade").style.left = (current_enemy_hp / current_enemy_max_hp * 100 - 3) + "%";
    document.getElementById("enemy_health_number").innerHTML = Math.floor(current_enemy_hp) + "/" + current_enemy_max_hp + "HP";
    if (enemy_onscreen == 1) {
        if (enemy.x > 20 * percent_w) {
            enemy.new_position();
        } else {
            enemy.speed_x = 0;
            enemy.x = 20 * percent_w;
            if (current_enemy_attack_stage < 1) {
                current_enemy_attack_stage = current_enemy_attack_stage + current_enemy_attack_speed;
            } else {
                change_health(-1 * current_enemy_damage);
                current_enemy_attack_stage = 0;
                var iy;
                for (iy = 0; iy * percent_h > enemy.height; iy--) {
                    create_particle((0.3 + Math.random() * current_enemy_damage / base_max_health) * 1.5, 20 * percent_w, enemy.y + iy * percent_h, Math.random() * percent_w * current_enemy_damage * -1.8 / base_max_health, (Math.random() * percent_h) - (Math.random() * percent_h), "red", 20);
                }
            }
        }
        if (current_enemy_hp <= 0) {
            if (enemies_slain != enemies_needed) {
                enemies_slain = enemies_slain + 1;
            }
            current_exp = current_exp + enemies[current_enemy_id].xp;
            document.getElementById("enemy_info_enemies_left").innerHTML = "Enemies left: " + (enemies_needed - enemies_slain);
            current_enemy_attack_stage = 0;
            var ix;
            var iy;
            for(ix = 0; ix * percent_w < enemy.width; ix++) {
                for (iy = 0; iy * percent_h > enemy.height; iy--) {
                    create_particle(0.8 + Math.random() * 0.5, enemy.x + ix * percent_w, enemy.y + iy * percent_h, (Math.random() * enemy.speed_x) + (enemy.speed_x * 0.4) + (Math.random() * 0.2 * percent_w), (Math.random() * percent_h / 4) - (Math.random() * percent_h /5), "red", 20);
                }
            }
            if (enemies_slain == enemies_needed) {
                if (auto_progress == 1) {
                    next_room();
                } else {
                    enemy_onscreen = 0;
                    enemy.x = 110 * percent_w;
                    enemy.speed_x = 0;
                    current_enemy_hp = 0;
                    enemy.new_position();
                }
            } else {
                spawn_enemy();
            }
        }
    }
}

function next_room() {
    if (enemies_slain == enemies_needed && region[current_region].length - 1> current_area) {
        current_area = current_area + 1;
        current_enemy_attack_stage = 0;
        load_area(region[current_region][current_area]);
    }
}

function update_player_bullet() {
    var current_projectile_number = 0;
    while (current_projectile_number < number_of_projectiles) {
        
        var proj_rotation = Math.atan2(enemy.center_y - projectiles[current_projectile_number].center_y, enemy.center_x - projectiles[current_projectile_number].center_x) * 180 / Math.PI;
        projectiles[current_projectile_number].rotation = proj_rotation;
        
        projectiles[current_projectile_number].speed_x = projectiles[current_projectile_number].projectile_speed * percent_w * (90 - Math.abs(proj_rotation)) / 90;
        if (proj_rotation < 0) {
            projectiles[current_projectile_number].speed_y = -1 * projectiles[current_projectile_number].projectile_speed * percent_w + Math.abs(projectiles[current_projectile_number].speed_x);
        } else {
            projectiles[current_projectile_number].speed_y = projectiles[current_projectile_number].projectile_speed * percent_w - Math.abs(projectiles[current_projectile_number].speed_x);
        }
        projectiles[current_projectile_number].update();
        projectiles[current_projectile_number].new_position();
        projectiles[current_projectile_number].projectile_speed = projectiles[current_projectile_number].projectile_speed * 1.08;
        
        
        
        if (((projectiles[current_projectile_number].x < enemy.x && enemy.x < projectiles[current_projectile_number].x + projectiles[current_projectile_number].width) || (enemy.x < projectiles[current_projectile_number].x && projectiles[current_projectile_number].x < enemy.x + enemy.width)) && ((projectiles[current_projectile_number].y < enemy.y && enemy.y + enemy.height < projectiles[current_projectile_number].y + projectiles[current_projectile_number].height) || (enemy.y < projectiles[current_projectile_number].y && projectiles[current_projectile_number].y + projectiles[current_projectile_number].height < enemy.y))) {
            if ((current_enemy_hp <= 0) == false) {
                current_enemy_hp = current_enemy_hp - current_damage;
            }
            document.getElementById("enemy_health_number").classList.add("shake");
            setTimeout(function () {document.getElementById("enemy_health_number").classList.remove("shake"); }, 500);
            var i;
            for (i = 0; i < Math.random() * 100; i++) {
                var color_variation = Math.random() * 100
                
                create_particle(0.8 + Math.random() * 0.3, projectiles[current_projectile_number].center_x, projectiles[current_projectile_number].center_y, ((Math.random() * percent_w) - (Math.random() * percent_w)) / 2, ((Math.random() * percent_h) - (Math.random() * percent_h)) / 2, "rgb(" + (120 + color_variation) + ", " + (30 + color_variation) + ", " + (120 + color_variation) + ")", 20);
            }
            projectiles.splice(current_projectile_number, 1);
            number_of_projectiles = number_of_projectiles - 1;
        } else {
            var color_variation = Math.random() * 100
            
            create_particle(Math.random() * 0.7, projectiles[current_projectile_number].center_x, projectiles[current_projectile_number].center_y, Math.random() * percent_w / -3, ((Math.random() * percent_h) - (Math.random() * percent_h)) / 3, "rgb(" + (120 + color_variation) + ", " + (30 + color_variation) + ", " + (120 + color_variation) + ")", 20);
            current_projectile_number = current_projectile_number + 1;
        }
    }
}

function create_particle(size, x, y, speed_x, speed_y, color, life) {
    number_of_projectile_particles = projectile_particles.push(new circle(size * percent_w, color, x, y, speed_x, speed_y, 1));
    projectile_particles[number_of_projectile_particles - 1].projectile_life = life + Math.random() * 10;
    projectile_particles[number_of_projectile_particles - 1].projectile_decay = projectile_particles[number_of_projectile_particles - 1].radius / (projectile_particles[number_of_projectile_particles - 1].projectile_life + 2);
}

function update_projectile_particles() {
    var current_projectile_particle_number = 0;
    while (current_projectile_particle_number < number_of_projectile_particles) {
        projectile_particles[current_projectile_particle_number].radius = projectile_particles[current_projectile_particle_number].radius - projectile_particles[current_projectile_particle_number].projectile_decay;
        
        projectile_particles[current_projectile_particle_number].update();
        projectile_particles[current_projectile_particle_number].new_position();
        projectile_particles[current_projectile_particle_number].projectile_life = projectile_particles[current_projectile_particle_number].projectile_life - 1;
        if (projectile_particles[current_projectile_particle_number].projectile_life < 0) {
            projectile_particles.splice(current_projectile_particle_number, 1);
            number_of_projectile_particles = number_of_projectile_particles - 1;
        } else {
            current_projectile_particle_number = current_projectile_particle_number + 1;
        }
    }
}

var current_nav_menu = 0;
function nav_menu_cycle(cycle) {
    current_nav_menu = current_nav_menu + cycle;
    if (current_nav_menu < 0) {
        current_nav_menu = 1;
    } else if (current_nav_menu > 1) {
        current_nav_menu = 0;
    }
    if (current_nav_menu == 0) {
        document.getElementById("spells").style.display = "flex";
        document.getElementById("nav_content_header").innerHTML = "Spells";
    } else {
        document.getElementById("spells").style.display = "none";
    }
    if (current_nav_menu == 1) {
        document.getElementById("skill_tree").style.display = "flex";
        document.getElementById("nav_content_header").innerHTML = "Skill tree";
        update_skill_tree();
    } else {
        document.getElementById("skill_tree").style.display = "none";
    }
}


/* perk array:
[0] = perks opened by this one
[1] = base charge per click
[2] = base charge per second
[3] = charge per click multiplier
[4] = charge per second multiplier
[5] = base_damage
[6] = damage_mult
*/
const perks = [
    [[1,2],1,0.05,0,0,0,0],        //0
    [[3],0,0,1,0,0,0],         //1
    [[4],0,0,0,0.5,0,0],         //2
]

var charge_per_click_mult = 1;
var charge_per_second_mult = 1;
var damage_mult = 1;

var current_perks = [];
var unlockable_perks = [0];

function update_skill_tree() {
    base_charge_per_click = 1;
    base_charge_per_second = 0.01;
    charge_per_click_mult = 1;
    charge_per_second_mult = 1;
    document.getElementById("skill_points").innerHTML = "Skill points: " + skill_points;
    if (current_perks.length > 0) {
        var i;
        var perks_to_clear = [];
        for (i = 0; i < current_perks.length; i++) {
            base_charge_per_click = base_charge_per_click + perks[current_perks[i]][1];
            base_charge_per_second = base_charge_per_second + perks[current_perks[i]][2];
            charge_per_click_mult = charge_per_click_mult + perks[current_perks[i]][3];
            charge_per_second_mult = charge_per_second_mult + perks[current_perks[i]][4];
            var ii;
            for (ii = 0; ii < perks[current_perks[i]][0].length; ii++) {
                if (unlockable_perks.includes(perks[current_perks[i]][0][ii]) == false && current_perks.includes(perks[current_perks[i]][0][ii]) == false) {
                    unlockable_perks.push(perks[current_perks[i]][0][ii]);
                }
            }
            document.getElementById("perk" + current_perks[i]).style.opacity = 1;
            document.getElementById("perk" + current_perks[i]).style.background = "rgb(200,200,200)";
            var lines = document.getElementsByClassName("perkline" + current_perks[i]);
            for (ii = 0; ii < lines.length; ii++) {
                lines[ii].setAttribute("stroke", "rgb(200, 200, 200)");
            }
        }
    }
    for (i = 0; i < unlockable_perks.length; i++) {
        document.getElementById("perkicon" + unlockable_perks[i]).style.opacity = 1;
        document.getElementById("perk" + unlockable_perks[i]).style.background = "rgb(61, 58, 53)";
        var lines = document.getElementsByClassName("perkline" + unlockable_perks[i]);
        for (ii = 0; ii < lines.length; ii++) {
            if (lines[ii].getAttribute("stroke") != "rgb(200, 200, 200)") {
                lines[ii].setAttribute("stroke", "rgb(61, 58, 53)");
            }
        }
    } 
}

function get_skill(perk_id) {
    if (unlockable_perks.includes(perk_id) && skill_points > 0) {
        current_perks.push(perk_id);
        unlockable_perks.splice(unlockable_perks.indexOf(perk_id), 1);
        skill_points = skill_points - 1;
        update_skill_tree();
    }
}

var current_damage;
var current_charge_per_click;
var current_charge_per_second;
function update_stats() {
    current_damage = base_damage * damage_mult;
    current_charge_per_click = base_charge_per_click * charge_per_click_mult;
    current_charge_per_second = base_charge_per_second * charge_per_second_mult;
}

function notification(name, text, color) {
    var i;
    for (i = 1; i < 4; i++) {
        if (document.getElementById("notification" + i).display == "none") {
            document.getElementById("notification" + i).style.display = "block";
            document.getElementById("notification" + i + "text").innerHTML = "<b>" + name + "</b>" + text;
            document.getElementById("notification" + i).style.background = color;
            break;
        }
    }
    if (i != 6) {
        document.getElementById("notification1").style.display = "block";
        document.getElementById("notification1text").innerHTML = "<b>" + name + "</b>" + text;
        document.getElementById("notification1").style.background = color;
    }
}

var auto_progress = 0;
function update_auto_progress() {
    if (document.getElementById("auto_progress").checked == true) {
        auto_progress = 1;
    } else {
        auto_progress = 0;
    }
}

function game_tick() {
    update_stats();
    update_level();
    update_health_mana();
    update_player_attack();
    
    game_area.clear();
    player.update();
    player.new_position();
    
    update_player_bullet();
    
    update_enemy();
    update_projectile_particles();
}

start_game();