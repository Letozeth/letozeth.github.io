---
title: "Crafting Systems"
lede: "I wanted to introduce people to the crafting systems more in-depth, I've been working on a lot of stuff lately but it's not quite ready for presentation yet."
tags: ["Crafting"]
---
## Metalworking (Blacksmith)

{% include image.html src="/assets/images/posts/blacksmith.jpg" alt="The Blacksmith (Metalworking) UI" caption="Metalworking and it's UI is not final yet and may change." %}

Metalworking is quite straight-forward, you select the item you want to craft from the list to the left, and the tier of the item at the very top.

The screenshot above shows the crafting process of a Tier 3 Staff, the Tiers signify what level range that item drops in, so it will be stronger.

The **Success Chance** is how likely that item is to become the displayed rarity and it's increased by feeding the process Clarite, Orichalcum and Lucerite, the more you feed the more it goes up, with stronger materials such as Lucerite giving the most progress.

If the success chance fails, it goes to rarity below, in this case it would be Epic if it fails.

On the Left and Right side there's two lists of Affixes. Left has the Prefix and Right has the Suffix. This lets you specify what kind of affixes you want on your crafted item. Infixes are always random.

The **Affix Success Chance** is controlled by the slider, which lets you feed Scrap Crystal to increase the chance. This only applies to items of Rare or higher rarity, magic always has these guaranteed. It's straight forward, a simple cost to guarantee the affixes if you can afford it.

At the bottom the total cost is displayed before crafting.

## Alchemy

{% include image.html src="/assets/images/posts/alchemy1.jpg" alt="The Alchemy main UI" caption="Alchemy UI may not be final yet and may change, but the crafting experience is pretty much done." %}

Alchemy lets you combine ingredients which you collect out in the world into strong 15~22.5 minute buffs. These buffs have both strong positive effect and moderate negative effects.

You can stack the same ingredient to make an even stronger mono-elixir (with some diminishing returns), or you can mix and match to get the desired effect that your build wants.

The Tier at the top increases costs but lets you make stronger elixirs. Tier 8 is designed for level 85+.

{% include image.html src="/assets/images/posts/sagecap.jpg" alt="A sagecap growing where it shouldn't" caption="The ingredient nodes are collected out in the world. Right now these are placed randomly, but will have specific regions and areas that they grow in later." %}

Every time you collect an ingredient or craft an elixir, you get **Alchemy Experience**, this levels up your Alchemy, to a total level of 20.

{% include image.html src="/assets/images/posts/alchemy2.jpg" alt="the alchemy leveling ui" caption="Level up and spend points in Alchemy to make better/cheaper elixirs or to gather ingredients faster." %}

The Alchemy levels give you points to spend on Alchemy Perks, you get a total of 20 points.

There's a total of 9 regular perks that affect either your elixirs or the gathering of ingredients in some way. And a Master Perk which locks you into a specialty in Alchemy.

Respecing costs an increasing amount of gold, and it's not recommended to respec often. I put it in just in-case someone messes up and needs to redo things. Though speccing for faster gathering and more XP early on and respecing into better elixirs later is definitely a valid strategy.

If you don't enjoy crafting, there is absolutely no need to level up Alchemy. All elixirs are fully tradable with other players.

## Enchanter

{% include image.html src="/assets/images/posts/enchanter.jpg" alt="The enchanter UI" caption="The enchanting UI is far from done, it's just in a functional state right now." %}

Enchanting isn't really a crafting profession, but rather an NPC service.

It allows you to re-roll a single stats on an item, as many times as you want but with increasing gold cost.

Once a stat has been selected and re-rolled, it will lock it in, so only that stat can be re-rolled on that item in the future.

Re-rolling stats does not prevent trading of tradable items, but the re-roll state will go with it.

## A Sneak-Peek to End the Post

{% include image.html src="/assets/images/posts/mainmenu-sneakpeek.jpg" alt="the main menu, showing a sneakpeek of systems I've been working on" caption="It may only look like the main menu for the game, but it shows two new system I've been working on for the game in the image." %}

I'll hopefully get the things that I want to post about done soon. I'll be going away in December for a long time, so don't expect posts from then until next year.
