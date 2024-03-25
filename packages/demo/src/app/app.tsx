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
  Paragraph,
  Text,
  WorldMap,
  grommet,
} from 'grommet';
import { Moon, SearchAdvanced, Sun } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import { PropsWithChildren, useState } from 'react';

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
      color="graph-0"
      continents={[
        {
          name: 'Europe',
          color: 'graph-1',
        },
      ]}
      places={[
        {
          name: 'Moscow',
          location: [55.44, 37.36],
          color: 'graph-2',
        },
      ]}
      selectColor="brand"
    />
  );
};

const CardTemplate = ({ title, children }: CardProps) => {
  return (
    <Card elevation="none" border pad="medium">
      <CardHeader>
        <Heading level={2} margin="none">
          {title}
        </Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export function App() {
  const [dark, setDark] = useState(true);

  return (
    <Grommet theme={theme} themeMode={dark ? 'dark' : 'light'} full>
      <Page>
        <AppBar>
          <Text size="large">@vsezol/lupa</Text>

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
          <PageHeader title="Welcome to @vsezol/lupa!" />

          <Box direction="row" justify="center">
            <WorldMapTemplate></WorldMapTemplate>
          </Box>

          <Box direction="row" justify="center" pad="large">
            <Box width="small">
              <Button
                fill={true}
                size="large"
                secondary
                icon={<SearchAdvanced size="large" />}
                label="Magnify"
              />
            </Box>
          </Box>

          <Grid columns="medium" gap="large" pad={{ bottom: 'large' }}>
            <CardTemplate title="Framework agnostic">
              <Paragraph>You can use it with any framework!</Paragraph>
            </CardTemplate>

            <CardTemplate title="Simple API">
              <Paragraph>Just one class!</Paragraph>
            </CardTemplate>

            <CardTemplate title="Magnify everything">
              <Paragraph>You can magnify any content on page!</Paragraph>
            </CardTemplate>
          </Grid>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
