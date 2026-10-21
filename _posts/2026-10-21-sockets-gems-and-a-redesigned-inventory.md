---
title: "Sockets, Gems and a Redesigned Inventory."
lede: "Been working on a lot of things lately, socketed gear, gems, redesigned the inventory and item sizes to have visual sockets in the item cells."
tags: ["Itemization","Gems","Sockets"]
---
## Gems
I've added 42 gems, 7 types and 6 cuts.

{% include image.html src="/assets/images/posts/gems.jpg" alt="Gem types and cuts." %}

## Sockets
Equipment now has a increasingly smaller chance to roll with sockets, getting an item that has 6 sockets has a 0.05% chance to drop. However 1 socket is far more common. With 80% of equipment having 0 sockets.

Sockets can also be added with a gold-sink & material spending mechanic at the jeweler.

## Jeweler
New NPC, sells lower quality gems, adds sockets to equipment, combines gems to upgrade them.

## A redesign of thee Inventory & Equipment UI.
This is something that had to be done to get the socket slots to appear the way I wanted it to. It's essentially identical to Diablo 2. This opens up the potential for a "Runeword" style system later if I decide to add one.

{% include image.html src="/assets/images/posts/newui-inventory.jpg" alt="The new Inventory Redesign" %}

This redesign moved the equipment into the inventory panel, which means I'll have to do a slight redesign of the character stats panel soon.

## Item Guard & A little bit of Anti-cheat.
In addition to these changes, I also added some safety nets for cases where items, gold or materials would disappear without a logical cause.

It now immediately rolls back such changes.
This helps keep your items safe, and as an added bonus, makes it a little harder to cheat.

On top of this, the character & account database now stores a history of 7 backups and takes a new backup every 24 hours. During this time the database becomes unresponsive, and I'm considering ways to make sure this doesn't interrupt gameplay.

## Mini-map Update

The mini-map now displays wind direction and strength with an arrow that grows in size depending on wind strength. When wind is gone, the arrow turns into a dot. Next to that, the current weather is displayed. Current in-game time is also displayed, as the game has day/night cycles.

A header was also added to show the current region and area. Currently the regions are not added, so it only shows "Act I" for now.

{% include image.html src="/assets/images/posts/minimap-changes.jpg" alt="Minimap changees" %}


That's all for today~
I've been working on a lot more stuff but this is something I wanted to share.
