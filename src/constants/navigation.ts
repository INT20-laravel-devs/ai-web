export enum Routes {
  Home = "/",
  Profile = "/profile",
  SignUp = "/auth/sign-up",
  SignIn = "/auth/sign-in",
  Blog = "/blog",
  About = "/about",
  Contact = "/contact",
  Github = "https://github.com/",
}

export const navigation = [
  { label: "Home", href: Routes.Home },
  { label: "Blog", href: Routes.Blog },
  { label: "About", href: Routes.About },
  { label: "Contact Us", href: Routes.Contact },
];

export const footerNavigation = [
  { label: "Home", href: Routes.Home },
  { label: "Blog", href: Routes.Blog },
  { label: "About", href: Routes.About },
  { label: "Github", href: Routes.Github },
];
