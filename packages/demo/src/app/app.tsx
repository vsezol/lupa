import { useLupa } from 'core';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Grommet,
  Header,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Text,
  WorldMap,
  grommet,
} from 'grommet';
import { Moon, SearchAdvanced, Sun } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { PropsWithChildren, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Bug } from './bug';

const theme = deepMerge(grommet, {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
});

const AppBar = (props: Record<string, unknown>) => (
  <Header
    background="graph-1"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    {...props}
  />
);

type CardProps = PropsWithChildren & { title: string };

const WorldMapTemplate = () => {
  return (
    <WorldMap
      fill={'vertical'}
      color="dark-4"
      continents={[
        {
          name: 'Europe',
          color: 'brand',
        },
      ]}
      places={[
        {
          name: 'Moscow',
          location: [55.44, 37.36],
          color: 'status-critical',
        },
      ]}
      selectColor="brand"
    />
  );
};

const rotateRight = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const rotateLeft = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

const Virus = styled.img<{ left?: boolean }>`
  width: 16px;
  height: 16px;
  position: absolute;
  animation: ${({ left = false }) => (left ? rotateLeft : rotateRight)} 2s
    linear infinite;
`;

const CardTemplate = ({ title, children }: CardProps) => {
  return (
    <Card elevation="none" border pad="medium">
      <CardHeader>
        <Heading level={3} margin="none">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export function App() {
  const [dark, setDark] = useState(false);

  useLupa({ size: 300 });

  return (
    <Grommet theme={theme} themeMode={dark ? 'dark' : 'light'} full>
      <Page>
        <AppBar>
          <Text size="large">ПУПА ЛУПА</Text>

          <Button
            a11yTitle={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            icon={dark ? <Moon /> : <Sun />}
            onClick={() => setDark(!dark)}
            tip={{
              content: (
                <Box
                  pad="small"
                  round="small"
                  background={dark ? 'dark-1' : 'light-3'}
                >
                  {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </Box>
              ),
              plain: true,
            }}
          />
        </AppBar>

        <PageContent>
          <PageHeader
            alignSelf="center"
            size="small"
            title="Приветствуем всех Пуп и Луп!"
          />

          <Grid columns="medium" gap="small" pad={{ bottom: 'large' }}>
            <CardTemplate title="Не видите баг? — Приблизьте!">
              <Box direction="row" justify="center" pad={{ top: 'medium' }}>
                <Box
                  direction="row"
                  justify="center"
                  style={{ position: 'relative' }}
                >
                  <Bug
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 4,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  <Button primary size="large" label="Не жмякается"></Button>
                </Box>
              </Box>
            </CardTemplate>

            <CardTemplate title="Вирусы на сайте? — Не проблема!">
              <Box
                direction="row"
                justify="center"
                pad={{ top: 'medium', bottom: 'medium' }}
              >
                <div style={{ position: 'relative', minHeight: '20px' }}>
                  <Virus
                    left
                    src="/virus-1.png"
                    alt="virus 1"
                    style={{ left: 0, top: 20 }}
                  />
                  <Virus
                    src="/virus-3.png"
                    alt="virus 2"
                    style={{ left: 20, top: 10 }}
                  />
                  <Virus left src="/virus-2.png" alt="virus 3" />
                </div>
              </Box>
            </CardTemplate>

            <CardTemplate title="Забудьте про ctrl + — есть лупа">
              <Box direction="row" justify="center" pad={{ top: 'medium' }}>
                <Button
                  size="large"
                  secondary
                  icon={<SearchAdvanced size="medium" />}
                  label="пупа-лупа!"
                />
              </Box>
            </CardTemplate>
          </Grid>

          <Box direction="row" justify="center">
            <WorldMapTemplate></WorldMapTemplate>
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
