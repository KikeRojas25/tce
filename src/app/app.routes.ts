import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {
                path: 'example',
                loadComponent: () => import('app/modules/admin/example/example.component')
                  .then(m => m.ExampleComponent)
            },
            {
              path: 'seguridad',
              loadComponent: () => import('./modules/admin/seguridad/seguridad.component')
                                    .then(m => m.SeguridadComponent),
              children: [
                {
                  path: 'listausuarios',
                  loadComponent: () => import('./modules/admin/seguridad/listuser/listuser.component')
                                        .then(m => m.ListuserComponent)
                },
                {
                  path: 'newusuario',
                  loadComponent: () => import('./modules/admin/seguridad/newuser/newuser.component')
                                        .then(m => m.NewuserComponent)
                },
               
                
             
              ]
            },
            {
                path: 'seguimiento',
                loadComponent: () => import('./modules/admin/finanzas/finanzas.component')
                                      .then(m => m.FinanzasComponent),
                children: [
                  {
                    path: 'manifiesto',
                    loadComponent: () => import('./modules/admin/finanzas/list/list.component')
                                          .then(m => m.ListCentroCostosComponent)
                  },
                  {
                    path: 'listaorden',
                    loadComponent: () => import('./modules/admin/comercial/listordenes/listordenes.component')
                                          .then(m => m.ListordenesComponent)
                  },
                  {
                    path: 'new',
                    loadComponent: () => import('./modules/admin/comercial/new/new.component')
                                          .then(m => m.NewPlanningComponent)
                  },
                  {
                    path: 'manifiesto2',
                    loadComponent: () => import('./modules/admin/comercial/listmanifiesto/listmanifiesto.component')
                                          .then(m => m.ListmanifiestoComponent)
                  },
                  {
                    path: 'routing/:uid',
                    loadComponent: () => import('./modules/admin/comercial/routing/routing.component' )
                                          .then(m => m.RoutingComponent)
                  },
                  {
                    path: 'recojo',
                    loadComponent: () => import('./modules/admin/comercial/programarrecojo/programarrecojo.component' )
                                          .then(m => m.ProgramarrecojoComponent)
                  }
                ]
              },
              {
                path: 'reportes',
                loadComponent: () => import('./modules/admin/reportes/reportes.component')
                                      .then(m => m.ReportesComponent),
                children: [
                  {
                    path: 'activity',
                    loadComponent: () => import('./modules/admin/reportes/activity/activity.component')
                                          .then(m => m.ActivityComponent)
                  },
                 
                ]
              },
        ]
    }
];
