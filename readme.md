<div align="center">
  <img src="https://raw.githubusercontent.com/thebrokenfinger/krisp/main/assets/krisp_banner.jpeg" width="100%" />
  <h4>
    Krisp
  </h4>
  <p style="color: #666;">
    Turn your markdown files into a website.
  </p>
  <p>
    <a href="https://www.npmjs.com/package/krisp">
      <img src="https://img.shields.io/npm/v/krisp.svg?style=flat-square" />
    </a>
    <a href="/license">
      <img src="https://img.shields.io/github/license/thebrokenfinger/krisp.svg?style=flat-square" />
    </a>
  </p>
  <p style="font-size:14px;text-decoration:underline;">
    <a href="https://demo.krispjs.org">
      View Demo
    </a>
  </p>
</div>

---

### What is Krisp?

Krisp is a Node framework that allows you to turn your markdown files into a website. It's built to be simple to use and flexible enough to be used for any type of website.

### Own your content

There is no database or CMS to manage. You own your content and can easily edit it in your favorite text editor.

### Usage

Install Krisp from npm:

```bash
npm install krisp
```

Put your markdown files in a folder called `content` in the root of your project. Then create a file called `manifest.json` in the root of your project and add the following code:

```json
{
  "name": "My Website",
  "email": "youremail@example.com",
  "theme": "tom-preston" // That's the theme that ships with Krisp
}
```

And that's it! You can now run `krisp start` to start your website.

### Themes

Krisp ships with a default theme called `tom-preston`. It's a simple theme that's taken from [Tom Preston-Werner's website](https://tom.preston-werner.com/). That's because Tom's website was the inspiration for minimalist style of Krisp.

### Docs

(Coming soon)

### Contributing

There's a lot of work to be done. If you'd like to contribute, please try it out and let me know what you think. If you find a bug, please open an issue. If you'd like to see a feature added, please open an issue.

### License

MIT © [Yatharth K](https://twitter.com/thebrokenfinger)
