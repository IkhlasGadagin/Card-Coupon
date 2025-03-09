import { Card as MantineCard, Image, Text, Badge, Group, Button, Grid, Container, TextInput } from '@mantine/core';
import { useState, useEffect } from 'react';

const Card = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://fakestoreapi.comwrong/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coupon: inputValue }),
    });
    const result = await response.json();
    setData([...data, result]);
    setInputValue('');
  };

  const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container size="xl" py="xl">

<form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <Group>
          <TextInput
            placeholder="Enter your text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button type="submit" color="blue">
            Submit
          </Button>
        </Group>
      </form>
      <Grid>
        {data.map((item) => (
          <Grid.Col key={item.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <MantineCard shadow="sm" padding="lg" radius="md" withBorder>
              <MantineCard.Section>
                <Image
                  src={item.image}
                  height={200}
                  alt={item.title}
                  fit="contain"
                />
              </MantineCard.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} truncate="end">
                  {item.title}
                </Text>
                <Badge color="pink" variant="light">
                  ${item.price}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={2}>
                {item.description}
              </Text>

              <Group  mt="md" mb="xs">
                <Badge color="blue" variant="light">
                  {item.category}
                </Badge>
                <Badge color="yellow" variant="light">
                  Rating: {item.rating.rate}
                </Badge>
              </Group>

              <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                View Details
              </Button>
            </MantineCard>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Card;