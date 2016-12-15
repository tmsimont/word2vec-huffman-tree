## Huffman tree from word2vec

### main.c

This is mostly a copy/paste from the [Google word2vec implementation in C](https://code.google.com/archive/p/word2vec/).

I've removed a lot of the code, and left only the Huffman tree creation behind.

I did this to study the results of the `CreateBinaryTree()` function to better understand how a Huffman tree is used in this library.

I have posted a [full write-up of what I learned on my blog](http://www.trevorsimonton.com/blog/2016/12/15/huffman-tree-in-word2vec.html).

### printjs.c

Again this is mostly the same thing as `main.c`, but I added a bunch of JavaScript callbacks to the stdout as the program runs. These callbacks call functions defined in `script.js`.

I just copy/paste these function callbacks to the bottom of `script.js` to view the results.

The goal is to create a picture of "memory" that looks like this:

[!memory picture](https://raw.githubusercontent.com/tmsimont/word2vec-huffman-tree/master/screenshot.png)

And then animate the changes.

The animation is in `anim.html`. Note that this has in now way been optimized for vocabularies with more than 8 unique words...
