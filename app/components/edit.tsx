import React, {useState} from 'react';
import { Modal, Portal, Button} from 'react-native-paper';

export const EditModal = ({form}) => {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <>
         <Portal>
           <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
               {form}
           </Modal>
         </Portal>
         <Button onPress={showModal}>
            Show
         </Button>
        </>
    );
};
