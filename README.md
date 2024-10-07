<h1 align="center">GITYZER</h1>

## Gityzer is an open-source tool that generates a personalized image summarizing a user's GitHub stats. This image can be easily embedded in GitHub README files, helping developers showcase their contributions, coding activity, and overall GitHub presence.

<p align="center">

<a href="https://github.com/vansh-codes/Gityzer"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></a> <a href="https://github.com/vansh-codes/Gityzer/blob/master/LICENSE"><img src="https://img.shields.io/badge/MIT-Licence-blue.svg?v=103"></a> 

![GitHub issues](https://img.shields.io/github/issues/vansh-codes/Gityzer)
![GitHub pull requests](https://img.shields.io/github/issues-pr/vansh-codes/Gityzer)
![GitHub forks](https://img.shields.io/github/forks/vansh-codes/Gityzer)
![GitHub Repo stars](https://img.shields.io/github/stars/vansh-codes/Gityzer?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/vansh-codes/Gityzer)
<br/>
![Repo Size](https://img.shields.io/github/repo-size/vansh-codes/Gityzer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github?af=5236ad)
<br/>
![Visitors Count](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fvansh-codes%2FGityzer&label=visitors&countColor=%2337d67a&style=flat&labelStyle=upper)
</p>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Medium%20Skin%20Tone.png" alt="man-techno" height=50 width=50> Live Demo
Visit https://gityzer.vercel.app/ to see the live demo

## Technologies Used:
<p>
  <a href="https://react.dev/">
    <img src="https://shields.io/badge/react-black?logo=react&style=for-the-badge" alt="Next.js Official Website"/>
  </a> <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-7c3aed?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Official Website"/>
  </a> <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC" alt="TailWind CSS Official Website"/>
  </a>
  <a href="https://ai.google.dev/gemini-api?gad_source=1&gclid=Cj0KCQjwo8S3BhDeARIsAFRmkOP_Ygexqh0M-OkFeeCxgOr5cjzTV2wNnS-nDzydv4Kaq9NPfPPTMhcaAm4_EALw_wcB">
    <img src="https://img.shields.io/badge/Google%20Gemini%20API-886FBF?style=for-the-badge&logo=googlegemini&logoColor=fff" alt="MongoDB official Website"/>
  </a>
</p>

### How it works ?
1. Fetch GitHub Data: Gityzer collects details about a user's GitHub profile, such as:
   - Total contributions
   - Participation in repositories
   - Active coding days
   - Most used programming languages
   - and many more parameters..
2. **Generate a Custom Tagline:** Using AI (the Gemini model), Gityzer creates a unique tagline for each user based on their activity and contribution patterns on GitHub. This tagline is consistent and meaningful, providing an at-a-glance summary of the user's work.
3. **Create and Embed an Image:** The tool generates an image with the following customizable elements:
    - **Username**: Details fetched from the GitHub profile.
    - **Styling Options:** Users can choose from different styles, themes (like dark or light mode), and color combinations.
    - **Update Frequency:** Users can decide how often the image gets updated (e.g., every 14 days). 
4. **Avoid Rate Limits:** To prevent hitting GitHub’s API rate limits, users will need to provide their *GitHub personal access token* with read permissions. This allows them to fetch their own profile data more efficiently.

Example URL:
Users can generate and customize the image using a URL like:
```css
gityzer.vercel.app?<github_username>&update=14&style=dark&theme=dark&color=white
```
- <github_username>: The GitHub username.
- update=14: Update the image every 14 days. optional parameter, by default set to 14
- style=dark: Choose the style (e.g., dark).
- theme=dark: Set the theme (e.g., dark mode).
- color=white: Choose the text color (e.g., white).

## How to contribute ?

Contributors can help by:
- **Building the API:** Integrating GitHub’s API to fetch user data.
- **Fine-tuning the Gemini AI model:** Ensuring the AI generates meaningful taglines.
- **Improving the Image Generator:** Enhancing the styling options and themes.
- **Improving the Website UI:** Enhancing the website style, design and UI
- **Improving User Experience:** Simplifying the setup process for users and ensuring smooth token handling to avoid rate limits.


> [!TIP] Gityzer aims to make it easy for developers to create dynamic, personalized badges for their GitHub profiles, helping them stand out with a summary of their contributions in a visually appealing way. Let's work together to build this awesome tool!

<div align="left">
<h2><font size="6"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" alt="Handshake" width="40" height="40" /> Want to Contribute? </font></h2>
</div>
<br>

We welcome contributors from the Developers & AI community to enrich Gityzer and make it even more valuable for everyone. Please follow our [CONTRIBUTING guidelines](https://github.com/vansh-codes/Gityzer/blob/master/CONTRIBUTING) for the following:-

***Want to contribute to our website you must have to read [CONTRIBUTING guidelines](https://github.com/vansh-codes/Gityzer/blob/master/CONTRIBUTING).***
- Setup Gityzer on your local machine
- Enhance the website
- Finetune the AI model
- enhance the image generation by making it responsive, adding themes and colors
- And more!


<h1 align=center> Project Admin <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Medium%20Skin%20Tone.png" alt="man-techno" height=40 width=40> </h1>

  <p align="center">
  <a href="https://github.com/vansh-codes"><img src="https://avatars.githubusercontent.com/vansh-codes" width="17%" /></a>
  </p>

<div align="center">
<p margin-right="10px 30px 100px 30px">
<a href="https://twitter.com/vanshchaurasiy4" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="vanshchaurasiy4" height="30" width="40" /></a>
<a href="https://www.linkedin.com/in/vanshchaurasiya24" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://www.linkedin.com/in/vanshchaurasiya24" height="30" width="40" /></a>
</p>
</div>


## Code Of Conduct📑

This project and everyone participating in it is governed by the [Code of Conduct](https://github.com/vansh-codes/Gityzer/blob/master/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.


<div align="center">

</div>
<br>
<!-- a big thanks to all the contributors -->
<div align="center">
<h2><font size="6"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" alt="Red Heart" width="40" height="40" /> Contributors </font></h2>
</div>
<br>

- We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating Gityzer to greater heights.
- Make sure you show some love by giving ⭐ to our repository

<br>

<!-- <center>
<div>
<a href="https://github.com/vansh-codes/Gityzer/graphs/contributors">
  <img width="90%" src="https://contrib.rocks/image?repo=vansh-codes/Gityzer" />
</a>
</div>
</center>
 -->
## License 📝

<img src="https://img.shields.io/badge/License-MIT-yellow.svg"/> <br> 
Gityzer is licensed under the terms of the MIT License. check out <a href="./LICENSE">LICENSE</a> for details. <img width=2300/>

<a name="support"></a>

## Support ⭐

- 💰 Become our [Sponsor](https://github.com/sponsors/vansh-codes)!
- ⭐ Star our Repo 

<p align="right">(<a href="#top">Back to top⬆️</a>)</p>
