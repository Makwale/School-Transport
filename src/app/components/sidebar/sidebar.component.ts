import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

var misc: any = {
  sidebar_mini_active: true
};

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  title?: string;
  type?: string;
}
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/learners",
    title: "Leaners",
    type: "link",
    icontype: "escalator_warning",
    isCollapsed: true,
  },
  {
    path: "/admin/schools",
    title: "Schools",
    type: "link",
    icontype: "school",
    isCollapsed: true,
  },
  {
    path: "/admin/transports",
    title: "Transports",
    type: "link",
    icontype: "local_taxi",
    isCollapsed: true,
  },
  {
    path: "/admin/drivers",
    title: "Drivers",
    type: "link",
    icontype: "person_3",
    isCollapsed: true,
  },
  {
    path: "/admin/owners",
    title: "Transport Owners",
    type: "link",
    icontype: "manage_accounts",
    isCollapsed: true,
  },
  {
    path: "/admin/users",
    title: "Users",
    type: "link",
    icontype: "people",
    isCollapsed: true,
  },
  {
    path: "/admin/profile",
    title: "Profile",
    type: "link",
    icontype: "person",
    isCollapsed: true,
  },


];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
    private acs: AccountService) {}

  ngOnInit() {
    console.log(this.acs.user);
    if(this.acs.user?.role === 'admin'){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }else if( this.acs.user?.role === 'vehicle_owner'){
      this.menuItems = [
        {
          path: "/admin/my-transports",
          title: "Transports",
          type: "link",
          icontype: "local_taxi",
          isCollapsed: true,
        },
        {
          path: "/admin/my-drivers",
          title: "Drivers",
          type: "link",
          icontype: "person_3",
          isCollapsed: true,
        },
        {
          path: "/admin/profile",
          title: "Profile",
          type: "link",
          icontype: "person",
          isCollapsed: true,
        },
      ]
    }else if(this.acs.user.role === 'parent'){
      this.menuItems = [
        {
          path: "/admin/my-children",
          title: "Children",
          type: "link",
          icontype: "family_restroom",
          isCollapsed: true,
        },
      ]
    }

    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }
  onMouseEnterSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  }
  onMouseLeaveSidenav() {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  }
  minimizeSidebar() {
    const sidenavToggler = document.getElementsByClassName(
      "sidenav-toggler"
    )[0];
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("g-sidenav-pinned")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("g-sidenav-pinned");
      body.classList.add("g-sidenav-hidden");
      sidenavToggler.classList.remove("active");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("g-sidenav-pinned");
      body.classList.remove("g-sidenav-hidden");
      sidenavToggler.classList.add("active");
      misc.sidebar_mini_active = true;
    }
  }
}
