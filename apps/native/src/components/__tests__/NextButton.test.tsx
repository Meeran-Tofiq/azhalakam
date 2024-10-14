import { render, fireEvent } from '@testing-library/react-native';
import NextButton from '../NextButton'; 

describe('NextButton', () => {
  test('calls onPress when pressed', () => {
    const mockOnPress = jest.fn(); 
    const { getByText } = render(<NextButton onPress={mockOnPress} isLastPage={false} />);

    fireEvent.press(getByText('Next')); 

    expect(mockOnPress).toHaveBeenCalled();
  });

  test('displays "Get started" when isLastPage is true', () => {
    const { getByText } = render(<NextButton onPress={() => {}} isLastPage={true} />);

    expect(getByText('Get started')).toBeTruthy();
  });
});