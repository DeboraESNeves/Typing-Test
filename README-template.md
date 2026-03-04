# Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Track their typing speed in real-time (WPM)
- View accuracy percentage during typing
- Choose between different difficulty levels (Easy, Medium, Hard)
- Select between Timed (60s) or Passage mode
- See their personal best score
- Restart the test at any time

### Screenshot

![](typing-speed-test.png)

### Links

- Live Site URL: [https://debora-typing-test.vercel.app/](https://debora-typing-test.vercel.app/)

## My process

I wanted to create a frontend application to test my skills with something colorful and engaging. I found the Frontend Mentor challenge and used the Figma file they provided.

I studied the application's business rules and sketched out how it could be implemented. The first step was thinking about the structure, so I created a state class and organized classes into folders (services, ui). To keep it organized, I delegated responsibilities to each class so they could work together cohesively.

I coded the HTML first, then organized all colors, fonts, sizes, etc. in my CSS file using CSS custom properties. After that, I built a basic design to visualize the project. I created functions in JavaScript and fixed bugs along the way, constantly adjusting the CSS to achieve the final result. Throughout the process, I was committing changes to GitHub regularly. The result was a useful and playful typing speed test.

### Built with

- Semantic HTML5 markup
- CSS custom properties (CSS Variables)
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (ES6+)
- Object-oriented programming
- State management pattern

### What I learned

This project strengthened my understanding of several key concepts:

**1. State Management**: I implemented a centralized state management system to handle the application's complex state transitions between different screens (home, typing, baseline, completed, new record).

```js
export const state = {
    status: "idle",
    // idle, running, finished

    ui: {
        screen: "home",
        //home, typing, completed, baseline, newRecord
    },
}
```

**2. Responsive CSS with Custom Properties**: I learned to effectively use CSS custom properties combined with media queries to create a fully responsive design that adapts seamlessly across devices.

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 16px;
}

@media (min-width: 800px) {
    .container {
        padding-inline: 32px;
    }
}

@media (min-width: 1000px) {
    .container {
        padding-inline: 112px;
    }
}
```

**3. Real-time Character Validation**: I implemented a character-by-character validation system that provides instant feedback to users as they type.

```js
if (currentIndex >= text.length) return;

if (key.length === 1) {
    const expected = text[currentIndex];
    const isCorrect = key === expected;

    state.typing.input += key;

    updateTyping(state.typing.input.length, isCorrect);
}
```

**4. Separation of Concerns**: I organized my code into distinct classes with specific responsibilities (UI management, game logic, statistics calculation), making the codebase more maintainable and scalable.

### Useful resources

- [Coder Coder builds](https://youtu.be/jBE_Oj2FK4E?si=FoXky101UiivksJ3) - This helped me especially with the design. She organized the CSS root variables so smoothly, it made the process much easier. I really liked this pattern and will use it going forward.
- [Coding With Dawid](https://youtu.be/E_tZH9R_zi8?si=1ZxLRShOJtwSEIRi) - When I was struggling with the typing and validation process, this video helped me understand the bond between the HTML and the backend logic.

## Author

- LinkedIn - [Debora Neves](https://www.linkedin.com/in/debora-neves-)

Hi! I'm an I.T. Student hungry to learn! I've been creating projects in Java and C#, but I also have an artistic side. Looking forward to an opportunity to show all my potential!
