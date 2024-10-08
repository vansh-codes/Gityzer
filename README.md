<div align="center">

# **GITYZER**

<i>Gityzer is an open-source tool that generates a personalized image summarizing a user's GitHub stats. This image can be easily embedded in GitHub README files, helping developers showcase their contributions, coding activity, and overall GitHub presence.*
</i>

<br>
<table align="center">
  <thead align="center">
    <tr border="1">
      <th>🤖 Project</th>
      <th>🌟 Stars</th>
      <th>🍴 Forks</th>
      <th>🐛 Issues</th>
      <th>🔔 Open PRs</th>
      <th>🔕 Close PRs</th>
      <th>🛠️ Languages</th>
      <th>👥 Contributors</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103"></td>
      <td><img src="https://img.shields.io/github/stars/vansh-codes/Gityzer?style=social"></td>
      <td><img src="https://img.shields.io/github/forks/vansh-codes/Gityzer"></td>
      <td><img src="https://img.shields.io/github/issues/vansh-codes/Gityzer"></td>
      <td><img src="https://img.shields.io/github/issues-pr/vansh-codes/Gityzer"></td>
      <td><img src="https://img.shields.io/github/issues-pr-closed/vansh-codes/Gityzer?color=critical"></td>
      <td><img src="https://img.shields.io/github/languages/count/vansh-codes/Gityzer?color=green"></td>
      <td><img src="https://img.shields.io/github/contributors/vansh-codes/Gityzer?color=blue"></td>
    </tr>
  </tbody>
</table>
</div>
<br>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Medium%20Skin%20Tone.png" alt="man-techno" height=50 width=50> Live Demo
Visit https://gityzer.vercel.app/ to see the live demo

## 💪 Outreach

Gityzer is proudly part of global initiatives engaging with passionate developers and open-source enthusiasts worldwide:

 <table>
  <tr>
    <th>Name</th>
    <th>Logo</th>
    <th>Purpose</th>
  </tr>
<!--   <tr>
    <td>Product Hunt</td>
    <td><a href="https://www.producthunt.com/posts/helpops-hub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-helpops&#0045;hub" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=491182&theme=light" alt="HelpOps&#0045;hub - Ensuring&#0032;You&#0032;Never&#0032;Get&#0032;Stuck&#0032;In&#0032;DevOps&#0032;Again&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a></td>
    <td> A platform where people launch different kind of products/projects and share them with the community </td>
  </tr> -->
  <tr>
    <td>GSSoC'2024-Extd </td>
    <td><img src="https://github.com/user-attachments/assets/1bd8ab15-604e-4ac9-a33e-dc753a07be23" alt="GirlScriptSummerOfCode"></td>
    <td> The coding period is from October 1st to October 30th, during which contributors make contributions and earn points on the platform.</td>
  </tr>
  <tr>
    <td>Hacktoberfest 2024 </td>
    <td><img src="https://github.com/user-attachments/assets/027eb349-43f2-4834-9343-1e8ba0bf54ed" alt="logo of Hacktoberfest 2024"></td>
    <td> Hacktoberfest is a month-long October event welcoming all skill levels to join the open source community </td>
  </tr>
</table>

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

### How it works

1. **Fetch GitHub Data:** Gityzer collects details about a user's GitHub profile, such as:
  - Total contributions
  - Participation in repositories
  - Active coding days
  - Most used programming languages
  - And many more parameters

2. **Generate a Custom Tagline:** Using AI (the Gemini model), Gityzer creates a unique tagline for each user based on their activity and contribution patterns on GitHub. This tagline is consistent and meaningful, providing an at-a-glance summary of the user's work.

3. **Create and Embed an Image:** The tool generates an image with the following customizable elements:
   - **Username:** Details fetched from the GitHub profile.
   - **Styling Options:** Users can choose from different styles, themes (like dark or light mode), and color combinations.
   - **Update Frequency:** Users can decide how often the image gets updated (e.g., every 14 days).

4. **Avoid Rate Limits:** To prevent hitting GitHub’s API rate limits, users will need to provide their *GitHub personal access token* with read permissions. This allows them to fetch their own profile data more efficiently.

**Example URL:**

Users can generate and customize the image using a URL like:

```css
gityzer.vercel.app?<github_username>&update=14&style=dark&theme=dark&color=white
```

- `<github_username>`: The GitHub username.
- `update=14`: Update the image every 14 days (optional parameter, default is 14).
- `style=dark`: Choose the style (e.g., dark).
- `theme=dark`: Set the theme (e.g., dark mode).
- `color=white`: Choose the text color (e.g., white).


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

---

## Contributors
We are immensely grateful to the following amazing individuals who have contributed their time, effort, and expertise to make this project better. Your contributions, whether through code, documentation, bug reports, or feature suggestions, have been invaluable. Thank you for helping us build and improve CodeCache! 🌟✨

Your dedication and hard work are what drive this project forward, and we couldn't have done it without you. Each contribution, no matter how small, plays a crucial role in our journey towards creating a more efficient and user-friendly tool for developers. 🙌💻

We look forward to your continued support and collaboration. Together, we can achieve even greater heights! 🚀🌐

Thank you once again to all our contributors! Your efforts are truly appreciated. 💖👏

<!-- readme: contributors -start -->
<!-- readme: contributors -end -->

---
### &#8627; Stargazers

<div align='center'>

[![Stargazers repo roster for @vansh-codes/Gityzer](https://reporoster.com/stars/vansh-codes/Gityzer)](https://github.com/vansh-codes/Gityzer/stargazers)

</div>

### &#8627; Forkers
<div align='center'>

[![Forkers repo roster for @vansh-codes/Gityzer](https://reporoster.com/forks/vansh-codes/Gityzer)](https://github.com/vansh-codes/Gityzer/network/members)

</div>
