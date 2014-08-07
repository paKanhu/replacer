Replacer - Replace Text Easily
==============================

Replacer is a very simple text replacer webapp. You can also use it offline.


## Goals

- [x] Replace text using RegEx.
- [ ] Add Template Text manually.
- [ ] Use files for all operation.
- [ ] Implement file drag & drop feature.


## Usage

### Step - 1
Paste the file content in the textarea.

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Template_Text_1</title>
</head>
<body>
<div id="heading">
    <h1>Template_Text_1</h1>
    <p>Template_Text_2</p>
</div>
<div class="content">
    <p>Template_Text_3</p>
</div>
<div id="footer">
    <p>Template_Text_4</p>
</div>
</body>
</html>
```

### Step - 2

Write the RegEx patter for the template text.

Example: `Template_Text_\d+`

### Step - 3

Write down the replacement text for corresponding template text.

Example:

    Template_Text_1 &rarr; Replacer
    Template_Text_2 &rarr; Replace Text Easily
    Template_Text_3 &rarr; Hello World!
    Template_Text_4 &rarr; paKanhu


### Step - 4

Copy the result from the textarea.

Example:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Replacer</title>
</head>
<body>
<div id="heading">
    <h1>Replacer</h1>
    <p>Replace Text Easily</p>
</div>
<div class="content">
    <p>Hello World!</p>
</div>
<div id="footer">
    <p>paKanhu</p>
</div>
</body>
</html>
```


## Release

Download the latest release - [paKanhu.github.io/replacer/replacer.zip](https://paKanhu.github.io/replacer/replacer.zip)


## License

Codes are licensed under [MIT](http://opensource.org/licenses/mit-license.html). Documentations are licensed under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
