import * as React from 'react';

import {
  AutoReloadOverlayBlockerProvider,
  CustomFieldsProvider,
  CustomFieldsProviderProps,
  LibraryProvider,
  LibraryProviderProps,
  NotificationsProvider,
  OverlayBlockerProvider,
  StrapiAppProvider,
  StrapiAppProviderProps,
} from '@strapi/helper-plugin';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { AdminContextProvider, AdminContextValue } from '../contexts/admin';

import { GuidedTourProvider } from './GuidedTour/Provider';
import { LanguageProvider, LanguageProviderProps } from './LanguageProvider';
import { Theme } from './Theme';
import { ThemeToggleProvider, ThemeToggleProviderProps } from './ThemeToggleProvider';

import type { Store } from '../core/store/configure';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface ProvidersProps
  extends Pick<ThemeToggleProviderProps, 'themes'>,
    Pick<LanguageProviderProps, 'messages' | 'localeNames'>,
    Pick<AdminContextValue, 'getAdminInjectedComponents'>,
    Pick<CustomFieldsProviderProps, 'customFields'>,
    Pick<LibraryProviderProps, 'components' | 'fields'>,
    Pick<
      StrapiAppProviderProps,
      | 'getPlugin'
      | 'menu'
      | 'plugins'
      | 'runHookParallel'
      | 'runHookSeries'
      | 'runHookWaterfall'
      | 'settings'
    > {
  children: React.ReactNode;
  store: Store;
}

const Providers = ({
  children,
  components,
  customFields,
  fields,
  getAdminInjectedComponents,
  getPlugin,
  localeNames,
  menu,
  messages,
  plugins,
  runHookParallel,
  runHookSeries,
  runHookWaterfall,
  settings,
  store,
  themes,
}: ProvidersProps) => {
  return (
    <LanguageProvider messages={messages} localeNames={localeNames}>
      <ThemeToggleProvider themes={themes}>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <AdminContextProvider getAdminInjectedComponents={getAdminInjectedComponents}>
                <StrapiAppProvider
                  getPlugin={getPlugin}
                  menu={menu}
                  plugins={plugins}
                  runHookParallel={runHookParallel}
                  runHookWaterfall={runHookWaterfall}
                  runHookSeries={runHookSeries}
                  settings={settings}
                >
                  <LibraryProvider components={components} fields={fields}>
                    <CustomFieldsProvider customFields={customFields}>
                      <AutoReloadOverlayBlockerProvider>
                        <OverlayBlockerProvider>
                          <GuidedTourProvider>
                            <NotificationsProvider>{children}</NotificationsProvider>
                          </GuidedTourProvider>
                        </OverlayBlockerProvider>
                      </AutoReloadOverlayBlockerProvider>
                    </CustomFieldsProvider>
                  </LibraryProvider>
                </StrapiAppProvider>
              </AdminContextProvider>
            </Provider>
          </QueryClientProvider>
        </Theme>
      </ThemeToggleProvider>
    </LanguageProvider>
  );
};

export { Providers };
