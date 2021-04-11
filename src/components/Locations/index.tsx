import { useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_LOCATIONS } from '../../graphql/queries';
import { useLocation } from '../../hooks/useLocation';
import { Loading } from '../Loading';

import styles from './styles.module.scss';

type LocationInfo = {
  id: string;
  name: string;
  type: string;
  dimension: string;
};

export function Locations() {
  const { randomLocationIds } = useLocation();

  const { data, loading, error } = useQuery(GET_LOCATIONS, {
    variables: {
      randomLocationsIds: randomLocationIds,
    },
  });

  if (loading) return <Loading screen="locations" />;
  if (error) {
    toast.error('Error when fetching locations, try again');
    return <></>;
  }

  return (
    <section className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Type</th>
            <th>Dimension</th>
          </tr>
        </thead>

        <tbody>
          {data.locationsByIds.map(
            ({ id, name, type, dimension }: LocationInfo) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{dimension}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </section>
  );
}
