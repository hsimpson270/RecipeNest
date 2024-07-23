# RecipeNest

## Table of Contents
- [Information](#information)
- [How to Run](#how-to-run)
- [Highlights](#highlights)
- [Challenges Faced](#challenges-faced)
- [Decisions Made](#decisions-made)
- [Conclusion](#conclusion)

## Information

This project is an Angular-based project designed for Intel 471. The goal of the project is to demonstrate an Angular-based solution for an online recipe platform that displays and filters recipes retrieved from [TheMealDB](https://www.themealdb.com/api.php). This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## How to Run

1. Navigate to the source folder and install npm packages by running `npm install`.
2. Run `ng serve` to build the project and start a local dev server.
3. Navigate to `http://localhost:4200/` in your web browser.

## Highlights

- The page is fully responsive and accessible with very little overhead thanks to leveraging css grid and rem-based units where applicable.
- Searching recipes by name and filtering recipes by Category is fully implemented.
- All code is fully documented, including comments left for additional features I would like to add if time allowed.

## Challenges Faced

### Time

At the start of the project, I initially estimated I could reasonably complete the entire project, minus tests, in about 2 hours. However, I set a limit for myself of 4 hours, knowing that potential challenges, such as environment, Angular upgrades, or API limitations would slow me down (each of which are detailed below). The code within the project is what I was able to achieve in that timeframe, and I have additional comments throughout to show what I would like to achieve if time were not a limiting factor.

### Environment

My only personal device is an old MacBook Air that was not set up for development, so unfortunately I spent over an hour just getting necessary packages installed so I could generate a project to work off of. That device continued to limit my efficiency, as one screen, a laptop keyboard, and a trackpad are not exactly ideal development condtions. Regardless, I tried to achieve what I could in the time I had allotted.

Additionally, since my device was not configured for development, it did not have the requirements I needed to setup ESLint and Prettier within the project, which normally would be something I add right away. I did attempt to set up those packages, but after 15 minutes of troubleshooting I decided it was not worth the continued effort to finish implementing it within my timeframe and opted to not add it to the project.

### Angular

Due to developing within Aurelia for the last nearly 3 years, the last Angular version I had used was Angular 12. Between Angular 12 and the current version of Angular 18 a lot has changed, such as the removal of modules and *ng bindings within the HTML. It came back to me very quickly and Angular is extremely similar to Aurelia, but the additional changes I was not aware of added an additional learning curve I did not expect.

### Font-Awesome

I wanted to establish font-awesome within the project to use for icons, but I was not able to get it working on my local machine and decided to opt against using it in the project. I attempted to use the npm install method, the Angular-based method, and a CDN method, but none of those three worked for me. It seems like they are really pushing you to create an account to create your own kit to use, but I didn't want to do that for just one project so instead I did not use font-awesome in the project.

### TheMealDB API

For the most part I found TheMealDB API very easy to work with, but I did spent quite a bit of time trying to find a call to get all recipes but in the end was not able to find it, other than determining if you send up an empty string to the search API call it will return a list of 25 recipes. Due to not being able to retrieve a default list of recipes and not being able to get more than one random recipe at a time I had to pivot from my initial design a good bit, which I have covered below under Decisions Made.

## Decisions Made

### Design

Design is not my strong suit, especially when it comes to HOW things should look. I have a good grasp on what constitutes good UX, but creating a pretty UI has always been a challenge for me, and throughout my professional career I have had UX designers create designs I should use and have not had to create any myself. As such, the color pallette I used I just grabbed from ChatGPT. I don't think it looks particularly good, but within the time limits I have I decided to let ChatGPT suggest colors instead of spending time looking through color pallettes online to find something I liked.

I did have an initial design in my head, but had to pivot pretty significantly due to the API return values mid-project. Initially, I wanted to display 3-4 featured recipes at the top of the page and have a section underneath to show all recipes. The bottom section was going to have accordion options on the left-hand side of the page for Areas, Categories, and Ingredients allowing the user to filter the recipes, and to the right of the accordions the recipes would be displayed based on supplied filters. Unfortunately, since I could not find a way to get all recipes on page load I had to change the design to what I ended up with as I did not want a large empty space below the featured recipes on page load. I do think my initial design would look and flow a lot better, but with the time constraints and with the API limitations I think what I ended up with is adequate at least.

### Code

I established directories and coding practices I would use throughout the project if it were completed fully, prioritizing documentation and clean code over 100% project completion. As such, there was a lot I was not able to get to, the biggest of which selecting a recipe to view it on its own page. It would be fairly trivial to set up the routing and display the page with all of its info, but I just didn't get to it in time. Additionally, I opted not to mirror the Categories section into Ingredients and Areas sections on the landing page as they would be the same thing with additional models and components.

### Testing

There are no unit tests in this project, as I did not have time to implement any tests within my alloted timeframe. However, even if I had additional time, likely the only place I would have written any tests for would have been the service, as I do not believe frontend unit tests have any value. I do think e2e tests are critical and necessary, but I am not familiar with Cypress so I unfortunately would not have been able to build out any of those at this time.

## Conclusion

Overall, I am not overly happy with what I achieved, but not entirely disappointed either. I don't think the project looks particularly good, but I do think it is very fundamentally sound, and with all of the challenges I faced the code I ended up with is really about 2 hours worth of work, even though it took 4 hours to achieve it due to environment issues, Angular 18 learning curve, and pivoting the design mid-project. I do wish I had more time, and I do wish the API was a bit more manageable to work with in its return data, but given what I have I think it turned out the best I could have hoped for. I am happy to answer any questions and to discuss any other decisions made that I did not document here. Thanks for reading.
