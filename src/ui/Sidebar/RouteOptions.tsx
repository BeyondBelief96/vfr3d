import { Color } from 'cesium';
import { useDispatch, useSelector } from 'react-redux';
import { HuePicker } from 'react-color';
import { setEndPointColor, setLineColor } from '../../redux/slices/routeSlice';
import { AppDispatch, RootState } from '../../redux/store';

const RouteOptions: React.FC = () => {
  const { lineColor, pointColor: endPointColor } = useSelector((state: RootState) => state.route);
  const dispatch = useDispatch<AppDispatch>();

  const handleLineColorChange = (color: Color) => {
    const colorString = `rgba(${color.red * 255}, ${color.green * 255}, ${color.blue * 255}, ${color.alpha})`;
    dispatch(setLineColor(colorString));
  };

  const handleEndPointColorChange = (color: Color) => {
    const colorString = `rgba(${color.red * 255}, ${color.green * 255}, ${color.blue * 255}, ${color.alpha})`;
    dispatch(setEndPointColor(colorString));
  };

  return (
    <form className="mt-6">
      <div className="mt-4 mr-4">
        <label htmlFor="line-color" className="block mb-2">
          Line Color
        </label>
        <HuePicker
          color={lineColor}
          onChange={(color) => handleLineColorChange(Color.fromCssColorString(color.hex))}
        />
      </div>

      <div className="mr-4">
        <label htmlFor="end-point-color" className="block mb-2">
          Route Points Color
        </label>
        <HuePicker
          width="10"
          color={endPointColor}
          onChangeComplete={(color) =>
            handleEndPointColorChange(Color.fromCssColorString(color.hex))
          }
        />
      </div>
    </form>
  );
};

export default RouteOptions;
