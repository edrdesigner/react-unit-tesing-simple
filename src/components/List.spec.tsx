import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List', () => {
  it('should render list items', () => {
    const { getByText, queryByText, rerender, unmount } = render(<List initialItems={['Diego', 'Rodz', 'Mayk']} />);
    expect(getByText('Diego')).toBeInTheDocument();
    expect(getByText('Rodz')).toBeInTheDocument();

    unmount();

    rerender(<List initialItems={['Dudz']} />);
    expect(getByText('Dudz')).toBeInTheDocument();
    expect(queryByText('Diego')).not.toBeInTheDocument();
    
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText } = render(<List initialItems={[]} />);

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    userEvent.type(inputElement, 'Novo')
    userEvent.click(addButton);

    await waitFor(()=> {
      expect(getByText('Novo')).toBeInTheDocument();
    });  
  });

  it('should be able to remove item from list', async () => {
    const { queryByText, getAllByText } = render(<List initialItems={['Diego']} />);

    const removeButtons = getAllByText('Remover');

    userEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Diego')
    // })
 
    await waitFor(()=> {
      expect(queryByText('Diego')).not.toBeInTheDocument();
    }); 
  });
});