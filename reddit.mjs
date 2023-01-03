#! /usr/bin/env node
import fetch from "node-fetch";
import open from "open";
import yargs from "yargs";

const { argv } = yargs(process.argv.slice(2));
let response;
if (argv["ask-reddit"]) {
  response = await fetch("https://www.reddit.com/r/AskReddit/.json");
} else {
  response = await fetch("https://www.reddit.com/.json");
}
const data = await response.json();
const children = data.data.children;

const randomPost = children[Math.floor(Math.random() * children.length)];
const link = `https://www.reddit.com${randomPost.data.permalink}`;

if (argv.print) {
  console.log(`
    title: ${randomPost.data.title}
    url: ${link}
    `);
} else {
  open(link);
}
