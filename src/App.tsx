import React, {useCallback, useMemo, useState} from 'react';
import {Button, Div, FormLayout, FormLayoutGroup, Group, Input, Panel, PanelHeader, View} from "@vkontakte/vkui";
import {useToken} from "./hooks/useToken";
import {useCsvReporters} from "./hooks/useCsvReporters";

const App = () => {
  const token = useToken();
  const [link, setLink] = useState();
  const {load} = useCsvReporters(token);

  const onClick = useCallback(() => {
    load(link)
  }, [link, load]);

  return (
      <View activePanel='main'>
        <Panel id='main'>
          <PanelHeader>Кто репостит?</PanelHeader>
          <FormLayout>
            <FormLayoutGroup top='Ссылка на пост'>
              <Input value={link} onChange={(event => setLink(event.currentTarget.value))}/>
            </FormLayoutGroup>
            <Button size='xl' disabled={!token} onClick={onClick}>
              Скачать
            </Button>
          </FormLayout>
        </Panel>
      </View>
  );
};

export default App;
