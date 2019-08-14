import React, { memo, useState } from 'react';
import { Picker, Item } from 'native-base';

const Piker_Item_Array = memo( ({ props }) => {
    return(
        <Item label={props.comboNameKr} value={props.comboVal} />
    );
});

export default Piker_Item_Array;