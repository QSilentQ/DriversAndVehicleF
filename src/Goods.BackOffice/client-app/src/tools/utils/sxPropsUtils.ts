import { SxProps, Theme } from '@mui/material';

export class SxPropsUtils {
	public static prepareToCopy(sx: SxProps<Theme> | null | undefined) {
		if (sx == null || sx == undefined) return [];

		return Array.isArray(sx) ? sx : [sx];
	}
}
