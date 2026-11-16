---
title: "Rivers, Grass & Some Other Stuff"
lede: "Some of the stuff that I've been working on recently."
tags: ["Technical","Visuals","Items","Skills"]
---
## Flowing Rivers
I've built a river system that utilizes a point grid to make water flow more naturally into rivers and lakes. The rivers flow faster in tighter areas and slower into larger areas, forming lakes simply by expanding the size of it. Where the river collides with Objects or Players/NPC/Monsters the river foams up naturally.

This short video shows the system working on the main-menu of the game.
{% include youtube.html id="E9IGj0MJzYc" %}

## Procedurally Generated Grass
Another system that really helps the world come alive is grass. Procedurally generated and in a top-down view it's fairly low performance cost.

For the Main-menu I use it completely procedurally, while in-game it's painted into masked areas to give more control over where it should be placed, though still the same grass and the same system.

The grass also reacts to the Weather system that I've built in the game, blowing in the wind etc along with the trees.

Here's a short video showing it in action on the Main-Menu scene, it's fairly simple looking up close, but comes together nicely at a distance.
{% include youtube.html id="ZWxCH9Axybc" %}

## Tier 10 Weapon Set & Tier 1+2 Armor Sets
I've been working a lot on the models for Tier 10 weapons as well as the armor sets for Tier 1 and Tier 2. I figured I'd showcase some of it here.

{% include image.html src="/assets/images/posts/t10.jpg" alt="" caption="Compilation of Tier 10 Weapons so far" %}

{% include image.html src="/assets/images/posts/perspective-swords.jpg" alt="" caption="I'm especially proud of the Lucerite Sword and it's Fallen Twin Unique Weapon" %}

{% include image.html src="/assets/images/posts/t1t2.jpg" alt="" caption="The Tier 1 and Tier 2 armor sets, the first two armor sets at early levels. They're meant to look like crap." %}

Next up in the armor sets is the Reinforced Leather Armor, which is the Tier 3 set, based on the Tier 2 set but with added plated areas. Followed by the Chain Mail armor set, Tier 4.

## New Skills
I've added quite a bit off skills so far. Each element now has it's own T1 Bolt spells. (Firebolt, Icebolt, Stonebolt, etc).

Each skill always comes with a Tier 1, Tier 2 and Tier 3 passive choice. And each Tier gives 3~ choices. That way, every skill in the game is customizable. (and around 9x more work for me)

I also expanded the Physical Talent Tree with more space to account for more play-styles. It currently holds Melee Warrior skills to the left, Rogue/stealth skill in the center, and Ranger skills to the right.

So far I've added Ricochet and Rapid Fire to the Ranged side, and Beartrap sitting in the middle between Rogue & Ranged.

For the Dark spell tree I've added the first T3 skill in the game, Summon Skeleton Mage.

{% include youtube.html id="aw1Jf3sUUf0" caption="Ending the post with a video showcasing the summoning work I did today!" %}
