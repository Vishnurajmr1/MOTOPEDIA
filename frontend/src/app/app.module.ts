import {
  CUSTOM_ELEMENTS_SCHEMA,
  ErrorHandler,
  NgModule,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FooterModule } from './shared/ui/footer/footer.module';
import { AppRoutingModule } from './app.routing.module';
import { NavbarModule } from './shared/ui/navbar/navbar.module';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
//   GoogleLoginProvider,
// } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { authReducer } from './auth/data-access/state/auth.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandler } from './shared/data-access/global/global-error-handler.service';
import { AdminNavbarModule } from './admin/ui/admin-navbar/admin-navbar.module';
import { AdminAsideModule } from './admin/ui/admin-aside/admin-aside.module';
import { AuthEffects } from './auth/data-access/state/auth.effects';
// import { SpinnerModule } from './shared/ui/spinner/spinner.module';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { NgxStripeModule } from 'ngx-stripe';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SocialLoginModule,
    FooterModule,
    NavbarModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name: 'MOTOPEDIA APP',
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    BrowserAnimationsModule,
    MatSnackBarModule,
    AdminNavbarModule,
    AdminAsideModule,
    RouterModule,
    // SpinnerModule,
    NgxStripeModule.forRoot(
      'pk_test_51Ow4oFSGocDch8je3w9T03YW37u0FSb1eN39WCTrqRYOh40VVDkaPZ2XopUvzFQ7K3OiMDxijq1ijHTc9qvH3EBf00n2zQ8gd0'
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false },
    },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '598989226384-9lq5ksdpkj645lpvq16030911hc584rm.apps.googleusercontent.com'
    //         ),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
    // },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
