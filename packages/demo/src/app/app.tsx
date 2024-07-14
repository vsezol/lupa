import { useLupa } from '@lupa/react';
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
  RangeInput,
  Text,
  WorldMap,
  grommet,
} from 'grommet';
import { Moon, SearchAdvanced, Sun } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Lupa } from './lupa';

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
    />
  );
};

const Virus = styled.img`
  width: 8px;
  height: 8px;
  position: absolute;
`;

const Bug = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  right: 2px;
`;

const Pupa = styled.img`
  width: 128px;
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
  const [lupaPosition, setLupaPosition] = useState<{ x: number; y: number }>();
  const [scale, setScale] = useState(2);

  const { render, setShow } = useLupa({
    size: 300,
    scale,
    ignoreElements: ['lupa-img'],
    onChangePosition: ({ x, y }) => setLupaPosition({ x, y }),
  });

  useEffect(() => {
    setTimeout(() => {
      render();
    }, 500);
  }, []);

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
                  <Bug src="/bug.png" />
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
                    style={{ left: 0, top: 10 }}
                  />
                  <Virus
                    src="/virus-3.png"
                    alt="virus 2"
                    style={{ left: 10, top: 5 }}
                  />
                  <Virus left src="/virus-2.png" alt="virus 3" />
                </div>
              </Box>
            </CardTemplate>

            <CardTemplate title="Забудьте про ctrl + — есть лупа">
              <Box
                direction="row"
                justify="center"
                align="center"
                gap={'medium'}
                pad={{ top: 'medium' }}
              >
                <Button
                  size="large"
                  secondary
                  icon={<SearchAdvanced size="medium" />}
                  label="Лупа!"
                  onClick={() => setShow(true)}
                />
                <RangeInput
                  value={scale}
                  onChange={(event) => setScale(Number(event.target.value))}
                  min={2}
                  max={10}
                />
              </Box>
            </CardTemplate>
          </Grid>

          <Box direction="row" justify="center">
            <WorldMapTemplate></WorldMapTemplate>
          </Box>

          <Box
            alignSelf="center"
            justify="center"
            align="center"
            title="Приветствуем всех Пуп и Луп!"
            pad="large"
          >
            <Box justify="center">
              <Heading level={3} margin="none">
                Это ПУПА
              </Heading>
            </Box>

            <Pupa src="/pupa.webp" alt="pupa" />
          </Box>
        </PageContent>
      </Page>

      {lupaPosition && <Lupa id="lupa-img" {...lupaPosition} />}
    </Grommet>
  );
}

export default App;
