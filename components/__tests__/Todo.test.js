import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn().mockResolvedValue(JSON.stringify([])),
    setItem: jest.fn().mockResolvedValue(undefined),
    removeItem: jest.fn().mockResolvedValue(undefined),
    clear: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/components/ParallaxScrollView', () => 'View');

jest.mock('@react-navigation/bottom-tabs', () => ({
    useBottomTabBarHeight: jest.fn().mockReturnValue(50),
}));
  
  
import HomeScreen  from '../../app/(tabs)/index';


test('renders and fires input field and button', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
    
    const { getByTestId } = render(<HomeScreen />);
    
    await waitFor(() => getByTestId('input-field'));
    
    const inputField = getByTestId('input-field');
    expect(inputField).toBeTruthy();
    
    fireEvent.changeText(inputField, 'Hello');
    expect(inputField.props.value).toBe('Hello');
    
    const submitButton = getByTestId('add-todo');
    expect(submitButton).toBeTruthy();
    
    fireEvent.press(submitButton);
  
    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledWith('Todos', JSON.stringify(['Hello'])));
});
  