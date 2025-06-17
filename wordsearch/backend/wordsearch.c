#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

char grid[20][20];
char checker[20][20];
char answers[20][20];
int grid_size;

// Directions mapped to letter characters: R,D,X,U (Right,Down,Diagonal Down, Diagonal Up)
char direction_chars[4] = {'R', 'D', 'X', 'U'};

// Initialize the grid with '.'
void initialize_grid()
{
    for (int i = 0; i < grid_size; i++)
    {
        for (int j = 0; j < grid_size; j++)
        {
            grid[i][j] = '.';
        }
    }
}

// Initialize the checker grid with '*'
void initialize_checker()
{
    for (int i = 0; i < grid_size; i++)
    {
        for (int j = 0; j < grid_size; j++)
        {
            grid[i][j] = '*';
        }
    }
}

// Check if a word is placeable
int can_place_word(const char *word, int row, int col, char dir)
{
    int len = strlen(word);
    int dr = 0, dc = 0;

    switch (dir)
    {
    case 'R':
        dc = 1;
        break;
    case 'D':
        dr = 1;
        break;
    case 'X':
        dr = 1;
        dc = 1;
        break;
    case 'U':
        dr = -1;
        dc = 1;
        break;
    }

    for (int i = 0; i < len; i++)
    {
        int r = row + i * dr, c = col + i * dc;
        if (r < 0 || r >= grid_size || c < 0 || c >= grid_size || (grid[r][c] != '.' && grid[r][c] != word[i]))
        {
            return 0;
        }
    }
    return 1;
}

// Place a word in the grid
void place_word(const char *word, int row, int col, char dir)
{
    int len = strlen(word);
    int dr = 0, dc = 0;

    switch (dir)
    {
    case 'R':
        dc = 1;
        break;
    case 'D':
        dr = 1;
        break;
    case 'X':
        dr = 1;
        dc = 1;
        break;
    case 'U':
        dr = -1;
        dc = 1;
        break;
    }

    for (int i = 0; i < len; i++)
    {
        grid[row + i * dr][col + i * dc] = word[i];
    }
}

// Inserts words into the grid but starts at a random place
int insert_word(const char *word)
{
    int start_row = rand() % grid_size;
    int start_col = rand() % grid_size;

    for (int offset_r = 0; offset_r < grid_size; offset_r++)
    {
        for (int offset_c = 0; offset_c < grid_size; offset_c++)
        {
            int row = (start_row + offset_r) % grid_size;
            int col = (start_col + offset_c) % grid_size;

            if (checker[row][col] == 'x')
                continue;

            for (int d = 0; d < 4; d++)
            {
                int dir_idx = rand() % 4; // Randomize direction choice
                char dir = direction_chars[dir_idx];
                if (can_place_word(word, row, col, dir))
                {
                    place_word(word, row, col, dir);
                    return 1;
                }
            }
            checker[row][col] = 'x';
        }
    }
    initialize_checker();
    return 0;
}

// Function to fill empty spaces with random letters
void fill_grid()
{
    for (int i = 0; i < grid_size; i++)
    {
        for (int j = 0; j < grid_size; j++)
        {
            if (grid[i][j] == '.')
            {   
                answers[i][j] = 'O';
                grid[i][j] = 'A' + (rand() % 26);
            }
            else{
                answers[i][j] = 'X';
            }
        }
    }
}

void print_grid()
{
    for (int i = 0; i < grid_size; i++)
    {
        for (int j = 0; j < grid_size; j++)
        {
            printf("%c ", grid[i][j]);
        }
        printf("\n");
    }

    for (int i = 0; i < grid_size; i++)
    {
        for (int j = 0; j < grid_size; j++)
        {
            printf("%c ", answers[i][j]);
        }
        printf("\n");
    }

    /*for (int i = 0; i < grid_size; i++)
    {
        for (int j = 0; j < grid_size; j++)
        {
            printf("%c ", checker[i][j]);
        }
        printf("\n");
    }*/
}

int main(int argc, char *argv[])
{
    // If there are no words listed in the argument
    if (argc < 3)
    {
        printf("'size' 'word' ...\n");
        return 1;
    }

    // Use the number that the user provided to set the grid
    grid_size = atoi(argv[1]);
    if (grid_size < 1 || grid_size > 20)
    {
        printf("Grid size of 1 - %d.\n", 20);
        return 1;
    }

    // Sets new time(NULL) seed
    srand(time(NULL));
    initialize_grid();

    // Insert words using method
    for (int i = 2; i < argc; i++)
    {
        if (!insert_word(argv[i]))
        {
            printf("Could not place word: %s\n", argv[i]);
            return 1;
        }
    }

    // Fill remaining spaces with random letters
    fill_grid();

    // Print the generated puzzle
    print_grid();

    // Print word list
    /*printf("\nWords:\n");
    for (int i = 2; i < argc; i++)
    {
        printf("%s\n", argv[i]);
    }*/

    return 0;
}
